import React, {Component, ReactNode} from 'react'
import {Pressable, StyleSheet, Text} from 'react-native'
import RNRestart from 'react-native-restart'
import {SafeAreaView} from 'react-native-safe-area-context'
import {devLog} from '@/processes'

type Props = {children: ReactNode}

type State = {hasError: boolean}

export class CustomErrorBoundary extends Component<Props, State> {
  constructor(props: Props) {
    super(props)
    this.state = {hasError: false}
  }

  static getDerivedStateFromError(error: unknown) {
    devLog(error)
    return {hasError: true}
  }

  render() {
    if (!this.state.hasError) {
      return this.props.children
    }

    const {wrapper, text, paragraph, button, buttonText} = styles

    return (
      <SafeAreaView style={wrapper}>
        <Text style={[paragraph, text]}>
          Er is iets misgegaan met de app. Sorry voor het ongemak!
        </Text>
        <Pressable style={button} onPress={() => RNRestart.Restart()}>
          <Text style={[text, buttonText]}>Herstart de app</Text>
        </Pressable>
      </SafeAreaView>
    )
  }
}

const styles = StyleSheet.create({
  wrapper: {
    flex: 1,
    padding: 40,
    backgroundColor: '#fff',
  },
  text: {
    fontSize: 18,
    lineHeight: 28,
  },
  paragraph: {
    marginBottom: 16,
  },
  button: {
    paddingVertical: 8,
    paddingHorizontal: 16,
    backgroundColor: '#004699',
  },
  buttonText: {
    color: '#fff',
    fontWeight: 'bold',
    textAlign: 'center',
  },
})
