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
    fontSize: 24,
    fontWeight: "bold",
  },
  buton: {
    backgroundColor: "gray",
    marginLeft:50,
    width: 40,
    height: 40,
    borderRadius: 1,
    display:"flex",
    justifyContent:"center",
    alignItems:"center"
  },
  textButon: {color: "white",
  },
  input: {
    width: "90%",
    backgroundColor: "lightgrey",
    padding: 4,
    margin: 5,
    marginTop:30,
    borderRadius: 6
  },
});
