// Source: https://github.com/ArturKalach/react-native-a11y/blob/master/docs/AndroidInput.md
package nl.amsterdam.app.textinput;

import com.facebook.react.uimanager.ThemedReactContext;
import com.facebook.react.views.textinput.ReactEditText;
import com.facebook.react.views.textinput.ReactTextInputManager;

class RCTEditTextManager extends ReactTextInputManager {
  // Copied react native text input manager, just copy pasted
  @Override
  public ReactEditText createViewInstance(ThemedReactContext context) {
    //Changed this line
    ReactEditText editText = new RCTEditText(context);
    int inputType = editText.getInputType();
    editText.setInputType(inputType & -131073);
    editText.setReturnKeyType("done");
    return editText;
  }
}