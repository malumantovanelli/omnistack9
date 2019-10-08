import React, { useState, useEffect } from "react";
import socketio from "socket.io-client";
import {
  Alert,
  AsyncStorage,
  ScrollView,
  SafeAreaView,
  Image,
  Text,
  TouchableOpacity,
  StyleSheet
} from "react-native";

import logo from "../assets/logo.png";

import SpotList from "../components/SpotList";

export default function List({ navigation }) {
  const [techs, setTechs] = useState([]);

  useEffect(() => {
    AsyncStorage.getItem("user").then(user_id => {
      const socket = socketio("http://192.168.0.12:3333", {
        query: { user_id }
      });

      socket.on("booking_response", booking => {
        Alert.alert(
          `Sua reserva em ${booking.spot.company} em ${booking.date} foi ${
            booking.approved ? "APROVADA" : "REJEITADA"
          }`
        );
      });
    });
  }, []);

  useEffect(() => {
    AsyncStorage.getItem("techs").then(storageTechs => {
      const techsArray = storageTechs.split(",").map(tech => tech.trim());
      setTechs(techsArray);
    });
  }, []);

  async function handleSubmit() {
    navigation.navigate("Search");
  }

  return (
    <SafeAreaView style={styles.container}>
      <Image style={styles.logo} source={logo} />
      <ScrollView>
        {techs.map(tech => (
          <SpotList key={tech} tech={tech} />
        ))}
      </ScrollView>
      <TouchableOpacity onPress={handleSubmit} style={styles.searchButton}>
        <Text style={styles.buttonText}>Nova Pesquisa</Text>
      </TouchableOpacity>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1
  },
  logo: {
    height: 32,
    resizeMode: "contain",
    alignSelf: "flex-start",
    marginLeft: 15,
    marginTop: 60
  },
  searchButton: {
    height: 40,
    width: 120,
    backgroundColor: "#f05a5b",
    borderRadius: 2,
    alignItems: "center",
    justifyContent: "center",
    position: "absolute",
    top: 50,
    right: 20
  },
  buttonText: {
    color: "#fff",
    fontWeight: "bold"
  }
});
