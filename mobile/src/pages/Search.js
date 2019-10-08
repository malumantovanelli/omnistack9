import React, { useState } from "react";
import {
  AsyncStorage,
  View,
  SafeAreaView,
  StyleSheet,
  TouchableOpacity,
  Text,
  TextInput
} from "react-native";

export default function Search({ navigation }) {
  const [techs, setTechs] = useState("");

  async function handleSubmit() {
    await AsyncStorage.setItem("techs", techs);
    navigation.navigate("List");
  }

  function handleCancel() {
    navigation.navigate("List");
  }

  return (
    <SafeAreaView behavior="padding" style={styles.container}>
      <Text style={styles.label}>Pesquisar outras tecnologias</Text>
      <View style={styles.form}>
        <TextInput
          style={styles.input}
          placeholder="Digite as tecnologias separadas por vírgula"
          placeholderTextColor="#999"
          autoCapitalize="none"
          autoCorrect={false}
          value={techs}
          onChangeText={setTechs}
        />
        <TouchableOpacity onPress={handleSubmit} style={styles.button}>
          <Text style={styles.buttonText}>Pesquisar</Text>
        </TouchableOpacity>
        <TouchableOpacity
          onPress={handleCancel}
          style={[styles.button, styles.cancelButton]}
        >
          <Text style={styles.buttonText}>Cancelar</Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center"
  },
  form: {
    alignSelf: "stretch",
    paddingHorizontal: 30
  },
  label: {
    fontSize: 20,
    color: "#444",
    paddingHorizontal: 20,
    marginTop: 10,
    marginBottom: 5
  },
  input: {
    borderWidth: 1,
    borderColor: "#ddd",
    paddingHorizontal: 20,
    fontSize: 16,
    color: "#444",
    height: 44,
    marginTop: 10,
    marginBottom: 15,
    borderRadius: 2
  },
  button: {
    height: 42,
    backgroundColor: "#f05a5b",
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 2,
    marginBottom: 5
  },
  cancelButton: {
    backgroundColor: "#ccc"
  },
  buttonText: {
    color: "#fff",
    fontWeight: "bold",
    fontSize: 16
  }
});
