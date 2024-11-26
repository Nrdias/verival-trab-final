/**
 * @param onChangeText        callback chamado quando o conteúdo do input é alterado
 * @param label               nome do campo
 * @param placeholder         texto que aparecerá dentro do input como placeholder (opcional)
 * @param passwordType        informa se o input é do tipo password (opcional)
 * @param emailType           informa se o input é do tipo email (opcional)
 * @param mask                formatação para o conteúdo do input (opcional)
 * > Máscaras possíveis: 'cel-phone', 'datetime' 
 * @param errorMessage        mensagem de erro a ser passada
 * @param value               valor inicial do inputText (opcional)
 *
 * @example                   <InputComponent label='Telefone' placeholder='(00) 00000-0000' mask='cel-phone' errorMessage='Campo Obrigatório!'/>
 */

import * as React from 'react';
import { StyleSheet, View, Text, TouchableOpacity, AccessibilityInfo } from 'react-native';
import { TextInput } from 'react-native-paper';
import { TextInputMask } from 'react-native-masked-text';
import colors from '../constants/colors';
import { fonts } from '../assets/fonts/fontlist';

export default function InputComponent({
  label,
  passwordType = false,
  emailType = false,
  mask = '',
  value = '',
  placeholder,
  onChangeText,
  errorMessage,
  editable = true
}) {
  const [text, setText] = React.useState(value);
  const [isFocused, setIsFocused] = React.useState(false);
  const [error, setError] = React.useState(errorMessage);
  const [accessibilityLabel, setAccessibilityLabel] = React.useState(`Caixa de edição ${label}`);

  // Monitora atualização de erros
  React.useEffect(() => {
    setError(errorMessage);
  }, [errorMessage])

  // Alteração do texto dentro do componente
  const handleChangeText = newText => {
    if (newText) setError('');
    else if (errorMessage) setError(errorMessage);

    if (onChangeText) onChangeText(newText);

    setText(newText);
  };

  // Mostrar/Esconder senha
  const [textMode, setTextMode] = React.useState('Mostrar');
  const [hidePassword, setHidePassword] = React.useState(false);
  const toggleText = () => {
    if (textMode === 'Mostrar') {
      setTextMode('Esconder');
      setHidePassword(true);
    } else {
      setTextMode('Mostrar');
      setHidePassword(false);
    }
  }
  // Se o TalkBack estiver ativado
  AccessibilityInfo.isScreenReaderEnabled().then((isEnabled) => {
    if (isEnabled) {
      setTextMode('Esconder');
      setHidePassword(true);
    }
  });

  // Propriedades gerais
  const inputProps = {
    accessible: false,
    importantForAccessibility: 'no',
    label:
      <Text importantForAccessibility='no'
        style={[
          styles.baseLabel,
          !editable ? styles.disabled : (!!error ? styles.labelError : isFocused ? styles.labelSelected : styles.baseLabel)
        ]}>
        {label}
      </Text>,
    value: text || value,
    onChangeText: handleChangeText,
    onBlur: () => setIsFocused(false),
    onFocus: () => setIsFocused(true),
    editable: editable,
    placeholder: placeholder,
    secureTextEntry: passwordType && !hidePassword,
    keyboardType: emailType ? 'email-address' : 'default',
    mode: 'outlined',
    activeOutlineColor: !!error ? colors.error : colors.blue,
    outlineColor: !!error ? colors.error : colors.textBlack,
    style: styles.input,
    contentStyle: { fontFamily: 'Quicksand-Medium', color: colors.textBlack },
  }

  if (!editable) {
    inputProps['outlineColor'] = colors.textGray;
    inputProps['contentStyle'] = { fontFamily: 'Quicksand-Medium', color: colors.textGray };
  }

  // Se tem máscara, add as propriedades
  if (mask) {
    inputProps['keyboardType'] = 'numeric';

    inputProps['render'] = props => (
      <TextInputMask
        {...props}
        type={mask}
        options={{
          format: 'DD/MM/YYYY'
        }}
      />
    )
  }

  React.useEffect(() => {
    let newLabel = accessibilityLabel;
    if (!value) {
      if (passwordType) newLabel += ', deve conter no mínimo 8 dígitos';

      if (mask === 'cel-phone') newLabel += ', deve conter 10 ou 11 dígitos, incluindo DDD';

      if (mask === 'datetime') newLabel += ', deve conter 8 dígitos';

      setAccessibilityLabel(newLabel);
    }

    if (!editable) {
      newLabel += ', campo não editável';
      setAccessibilityLabel(newLabel);
    }
  }, []);

  return (
    <View style={styles.inputContainer}
      accessible={true}
      accessibilityLabel={
        value ?
          `${accessibilityLabel}, texto ${value} detectado`
          : accessibilityLabel
      }>

      <View style={styles.inputPasswdContainer}
        accessible={false}
        importantForAccessibility='no'>
        <TextInput {...inputProps} />

        {passwordType && (
          <TouchableOpacity style={styles.hideButton}
            accessible={false}
            importantForAccessibility='no'
            onPress={toggleText}>
            <Text style={styles.showText}>{textMode}</Text>
          </TouchableOpacity>
        )}
      </View>

      {error && (
        <View style={styles.errorContainer}
          accessibilityLabelledBy={label}
          accessibilityLabel={`Erro no campo ${label}. ${error}`}
          accessibilityLiveRegion="polite">
          <Text style={styles.errorMsg}>{error}</Text>
        </View>
      )}
    </View>
  );
};


const styles = StyleSheet.create({
  inputContainer: {
    minWidth: '100%',
    alignItems: 'center',
    justifyContent: 'center',
  },
  input: {
    width: '80%',
    height: 50,
    fontSize: 18,
    backgroundColor: colors.backgroundScreen
  },
  baseLabel: {
    fontFamily: 'Quicksand-Medium',
    color: colors.textBlack
  },
  labelSelected: {
    fontFamily: 'Quicksand-Medium',
    color: colors.textBlue
  },
  labelError: {
    fontFamily: 'Quicksand-Medium',
    color: colors.error
  },
  disabled: {
    color: colors.textGray
  },

  errorContainer: {
    minWidth: '80%',
    justifyContent: 'right',
    marginTop: '2%',
    marginBottom: '1%',
  },
  errorMsg: {
    color: colors.error,
    fontSize: 15,
    fontFamily: 'Quicksand-Medium',
  },

  inputPasswdContainer: {
    minWidth: '80%',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
  },
  hideButton: {
    position: 'absolute',
    marginTop: 0,
    right: 0,
    marginRight: '2%'
  },
  showText: {
    color: colors.textBlack,
    fontSize: 15,
    fontWeight: '500',
    textDecorationLine: 'underline'
  },
});