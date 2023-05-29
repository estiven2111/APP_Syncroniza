import { StyleSheet } from "react-native";

// export const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//     backgroundColor: 'red',
//     alignItems: 'center',
//     justifyContent: 'center',
//   },
// });

export const styles = StyleSheet.create({
  container: {
    backgroundColor: "grey",
  },
  Navbar: {
    margin: 0,
    padding: 0,
    width: "10%",
    height: "10%",
    backgroundColor: "#20232a",
    display: "flex",
    justifyContent: "center",
  },
  text: {
    display: "flex",

    color: "#20232a",
    fontSize: 15,
    fontWeight: "bold",
  },
  buton: {
    backgroundColor: "gray",
    padding: 10,
    marginLeft: 15,
    width: 60,
    height: 50,
    borderRadius: 1,
  },
  textButon: {
    fontSize: 30,
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    color: "white",
  },
});
