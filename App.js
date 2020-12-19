import React, { useState } from "react";
import AntDesign from "react-native-vector-icons/AntDesign";
import {
  Button,
  View,
  StyleSheet,
  TouchableOpacity,
  Text,
  TextInput,
  ScrollView,
} from "react-native";
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";

function MainScreen({ navigation, route }) {
  const [getPrice, setPrice] = useState("");
  const [getDiscount, setDiscount] = useState("");

  const [getDiscountValue, setDiscountValue] = useState("");
  const [getSaveAmount, setSaveAmount] = useState("");

  const [getHistory, setHistory] = useState([]);

  React.useLayoutEffect(() => {
    navigation.setOptions({
      headerRight: () => (
        <View style={{ padding: 5 }}>
          <Button
            title="History"
            color="grey"
            onPress={() =>
              navigation.navigate("History", {
                record: getHistory,
              })
            }
          />
        </View>
      ),
    });
  }, [navigation]);

  const calculate = () => {
    const actual = Number(getPrice);
    const discount = Number(getDiscount);
    const discountValue = (actual - actual * (discount / 100)).toFixed(2);
    const save = (actual - discountValue).toFixed(2);
    setDiscountValue(String(discountValue));
    setSaveAmount(String(save));
  };

  const checkDiscount = (data) => {
    const check = Number(data);
    if (check < 0 || check > 100) {
      alert("Invalid Discount Check Again Applied");
      setDiscount("");
    } else {
      setDiscount(data);
    }
  };

  const save = () => {
    const calculations = [
      getPrice,
      getDiscount,
      getDiscountValue,
      getSaveAmount,
    ];
    setHistory([...getHistory, calculations]);
    // calculate();
  };

  return (
    <View>
      <Text style={styles.header}>Discount Calculator</Text>
      <View style={styles.inputTextContainer}>
        <View style={styles.inputTextStyles}>
          <Text>Orignal Price: </Text>
          <TextInput
            keyboardType="decimal-pad"
            value={getPrice}
            onChangeText={(data) => setPrice(data)}
            placeholder="Enter Actual Price"
          />
        </View>
        <View style={styles.inputTextStyles}>
          <Text>Discount Avaliable: </Text>
          <TextInput
            keyboardType="decimal-pad"
            value={getDiscount}
            onChangeText={(data) => checkDiscount(data)}
            placeholder="Enter Discount"
          />
        </View>
      </View>
      <View style={styles.buttonStyle}>
        <Button title="Calculate" color="grey" onPress={() => calculate()} />
      </View>
      <View style={styles.inputTextContainer}>
        <View style={styles.inputTextStyles}>
          <Text>Discounted Value: </Text>
          <TextInput
            style={styles.textStyle}
            editable={false}
            value={getDiscountValue}
            placeholder="Discounted Price"
          />
        </View>
        <View style={styles.inputTextStyles}>
          <Text>You Save: </Text>
          <TextInput
            style={styles.textStyle}
            editable={false}
            value={getSaveAmount}
            placeholder="You Save"
          />
        </View>
      </View>
      <View style={styles.inputTextContainer}>
        <View style={styles.buttonStyle}>
          <Button title="Save Value" color="grey" onPress={() => save()} />
        </View>
      </View>
    </View>
  );
}

function HistoryScreen({ navigation, route }) {
  var record = route.params.record;
  var i = 0;
  console.log(route.params.record);
  const [getHistory, setHistory] = useState(record);
  console.log(getHistory.length);
  React.useLayoutEffect(() => {
    navigation.setOptions({
      headerLeft: () => (
        <View style={{ padding: 5 }}>
          <AntDesign
            name="Back"
            size={32}
            color="black"
            onPress={() => navigation.navigate("Home", { record: getHistory })}
          />
        </View>
      ),
    });
  }, [navigation]);
  return (
    <View style={styles.container}>
      <Text style={styles.header}>History</Text>
      <View style={{ padding: 10 }}>
        <ScrollView>
          {getHistory.map((data) => (
            <TouchableOpacity key={i++}>
              <Text>
                {data[0]}| {data[1]}| {data[2]}| {data[3]}
              </Text>
            </TouchableOpacity>
          ))}
        </ScrollView>
      </View>
    </View>
  );
}

const Stack = createStackNavigator();

function MyStack() {
  return (
    <Stack.Navigator initialRouteName={"Home"}>
      <Stack.Screen name="Home" component={MainScreen} />
      <Stack.Screen name="History" component={HistoryScreen} />
    </Stack.Navigator>
  );
}

export default function App() {
  return (
    <NavigationContainer>
      <MyStack />
    </NavigationContainer>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
  button: {
    alignItems: "center",
    backgroundColor: "#DDDDDD",
    padding: 10,
    margin: 5,
    width: "35%",
  },
  button2: {
    alignItems: "center",
    backgroundColor: "#DDDDDD",
    padding: 10,
    margin: 5,
  },
  testStyle: {
    padding: 5,
    margin: 5,
  },
  header: {
    fontSize: 36,
    margin: "5%",
  },
  textStyle: {
    color: "black",
  },
  inputTextContainer: {
    flexDirection: "row",
  },
  inputTextStyles: {
    width: "48%",
    borderWidth: 2,
    borderColor: "grey",
    padding: 5,
    margin: 5,
  },
  buttonStyle: {
    width: "50%",
    padding: "5%",
  },
});
