import React, {useEffect} from "react";
import { FlatList, StyleSheet } from "react-native";
import listingsApi from "../api/listings";

import Card from "../components/Card";
import colors from "../config/colors";
import routes from "../navigation/routes";
import Screen from "../components/Screen";
import useApi from "../hooks/useApi";
import AppText from "../components/Text";
import AppButton from "../components/Button";

function ListingsScreen({ navigation }) {
  const {data: listings, error, request: loadListings } = useApi(listingsApi.getListings);

  useEffect(() => {
    loadListings();
  }, [])

  return (
    <Screen style={styles.screen}>
      { error && (
          <>
            <AppText>Couldn't retrieve the listings</AppText>
            <AppButton title="Retry" onPress={loadListings} />
          </>
      )}
      <FlatList
        data={listings}
        keyExtractor={(listing) => listing.id.toString()}
        renderItem={({ item }) => (
            <Card
                title={item.title}
                subTitle={"$" + item.price}
                imageUrl={item.images[0].url}
                onPress={() => navigation.navigate(routes.LISTING_DETAILS, item)}
            />
        )}
      />
    </Screen>
  );
}

const styles = StyleSheet.create({
  screen: {
    padding: 20,
    backgroundColor: colors.light,
  },
});

export default ListingsScreen;
