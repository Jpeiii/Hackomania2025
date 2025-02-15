import React, { useEffect, useMemo } from "react";
import { Block, Text, Button, Image, Icon } from "../../components";
import NavBar from "../Navbar";
import { useTheme } from "../../hooks";
import { useNavigation } from "@react-navigation/core";
import { selectUser } from "../../reduxsaga/selectors/authSelector";
import { useSelector } from "react-redux";
import MasonryList from "reanimated-masonry-list";
import { View } from "react-native";
import type { FC, ReactElement } from "react";

export default function isWebProfile() {
  const { colors, sizes, gradients } = useTheme();
  const navigation = useNavigation();
  const user = useSelector(selectUser);

  interface Furniture {
    id: string;
    imgURL: string;
    text: string;
  }

  const data: Furniture[] = [
    {
      id: "id123",
      imgURL:
        "https://ii1.pepperfry.com/media/catalog/product/m/o/568x625/modern-chaise-lounger-in-grey-colour-by-dreamzz-furniture-modern-chaise-lounger-in-grey-colour-by-dr-tmnirx.jpg",
      text: "Pioneer LHS Chaise Lounger in Grey Colour",
    },
    {
      id: "id124",
      imgURL:
        "https://www.precedent-furniture.com/sites/precedent-furniture.com/files/styles/header_slideshow/public/3360_SL%20CR.jpg?itok=3Ltk6red",
      text: "Precedant Furniture",
    },
    {
      id: "id125",
      imgURL:
        "https://hips.hearstapps.com/hmg-prod.s3.amazonaws.com/images/leverette-fabric-queen-upholstered-platform-bed-1594829293.jpg",
      text: "Leverette Upholstered Platform Bed",
    },
    {
      id: "id126",
      imgURL:
        "https://hips.hearstapps.com/hmg-prod.s3.amazonaws.com/images/briget-side-table-1582143245.jpg?crop=1.00xw:0.770xh;0,0.129xh&resize=768:*",
      text: "Briget Accent Table",
    },
    {
      id: "id127",
      imgURL:
        "https://hips.hearstapps.com/hmg-prod.s3.amazonaws.com/images/rivet-emerly-media-console-1610578756.jpg?crop=1xw:1xh;center,top&resize=768:*",
      text: "Rivet Emerly Media Console",
    },
    {
      id: "id128",
      imgURL:
        "https://hips.hearstapps.com/hmg-prod.s3.amazonaws.com/images/drew-barrymore-flower-home-petal-chair-1594829759.jpeg?crop=1xw:1xh;center,top&resize=768:*",
      text: "Drew Barrymore Flower Home Accent Chair",
    },
    {
      id: "id129",
      imgURL:
        "https://hips.hearstapps.com/hmg-prod.s3.amazonaws.com/images/goodee-ecobirdy-charlie-chairs-1594834221.jpg?crop=1xw:1xh;center,top&resize=768:*",
      text: "Ecobirdy Charlie Chair",
    },
    {
      id: "id130",
      imgURL:
        "https://hips.hearstapps.com/hmg-prod.s3.amazonaws.com/images/hailey-sofa-1571430947.jpg?crop=0.481xw:0.722xh;0.252xw,0.173xh&resize=768:*",
      text: "Hailey Sofa",
    },
    {
      id: "id131",
      imgURL:
        "https://hips.hearstapps.com/hmg-prod.s3.amazonaws.com/images/archer-home-designs-dining-table-1594830125.jpg?crop=0.657xw:1.00xh;0.0986xw,0&resize=768:*",
      text: "Farmhouse Dining Table",
    },
    {
      id: "id132",
      imgURL:
        "https://hips.hearstapps.com/hmg-prod.s3.amazonaws.com/images/evelyn-coffee-table-1610578857.jpeg?crop=1xw:1xh;center,top&resize=768:*",
      text: "Evelyn Coffee Table",
    },
    {
      id: "id133",
      imgURL:
        "https://hips.hearstapps.com/hmg-prod.s3.amazonaws.com/images/burrow-nomad-sofa-1594837995.jpg?crop=1xw:1xh;center,top&resize=768:*",
      text: "Slope Nomad Leather Sofa",
    },
    {
      id: "id134",
      imgURL:
        "https://apicms.thestar.com.my/uploads/images/2020/02/21/570850.jpg",
      text: "Chair and Table",
    },
    {
      id: "id223",
      imgURL:
        "https://ii1.pepperfry.com/media/catalog/product/m/o/568x625/modern-chaise-lounger-in-grey-colour-by-dreamzz-furniture-modern-chaise-lounger-in-grey-colour-by-dr-tmnirx.jpg",
      text: "Pioneer LHS Chaise Lounger in Grey Colour",
    },
    {
      id: "id224",
      imgURL:
        "https://www.precedent-furniture.com/sites/precedent-furniture.com/files/styles/header_slideshow/public/3360_SL%20CR.jpg?itok=3Ltk6red",
      text: "Precedant Furniture",
    },
    {
      id: "id225",
      imgURL:
        "https://hips.hearstapps.com/hmg-prod.s3.amazonaws.com/images/leverette-fabric-queen-upholstered-platform-bed-1594829293.jpg",
      text: "Leverette Upholstered Platform Bed",
    },
    {
      id: "id226",
      imgURL:
        "https://hips.hearstapps.com/hmg-prod.s3.amazonaws.com/images/briget-side-table-1582143245.jpg?crop=1.00xw:0.770xh;0,0.129xh&resize=768:*",
      text: "Briget Accent Table",
    },
    {
      id: "id227",
      imgURL:
        "https://hips.hearstapps.com/hmg-prod.s3.amazonaws.com/images/rivet-emerly-media-console-1610578756.jpg?crop=1xw:1xh;center,top&resize=768:*",
      text: "Rivet Emerly Media Console",
    },
    {
      id: "id228",
      imgURL:
        "https://hips.hearstapps.com/hmg-prod.s3.amazonaws.com/images/drew-barrymore-flower-home-petal-chair-1594829759.jpeg?crop=1xw:1xh;center,top&resize=768:*",
      text: "Drew Barrymore Flower Home Accent Chair",
    },
    {
      id: "id229",
      imgURL:
        "https://hips.hearstapps.com/hmg-prod.s3.amazonaws.com/images/goodee-ecobirdy-charlie-chairs-1594834221.jpg?crop=1xw:1xh;center,top&resize=768:*",
      text: "Ecobirdy Charlie Chair",
    },
    {
      id: "id230",
      imgURL:
        "https://hips.hearstapps.com/hmg-prod.s3.amazonaws.com/images/hailey-sofa-1571430947.jpg?crop=0.481xw:0.722xh;0.252xw,0.173xh&resize=768:*",
      text: "Hailey Sofa",
    },
    {
      id: "id231",
      imgURL:
        "https://hips.hearstapps.com/hmg-prod.s3.amazonaws.com/images/archer-home-designs-dining-table-1594830125.jpg?crop=0.657xw:1.00xh;0.0986xw,0&resize=768:*",
      text: "Farmhouse Dining Table",
    },
    {
      id: "id232",
      imgURL:
        "https://hips.hearstapps.com/hmg-prod.s3.amazonaws.com/images/evelyn-coffee-table-1610578857.jpeg?crop=1xw:1xh;center,top&resize=768:*",
      text: "Evelyn Coffee Table",
    },
    {
      id: "id233",
      imgURL:
        "https://hips.hearstapps.com/hmg-prod.s3.amazonaws.com/images/burrow-nomad-sofa-1594837995.jpg?crop=1xw:1xh;center,top&resize=768:*",
      text: "Slope Nomad Leather Sofa",
    },
    {
      id: "id234",
      imgURL:
        "https://apicms.thestar.com.my/uploads/images/2020/02/21/570850.jpg",
      text: "Chair and Table",
    },
  ];

  const FurnitureCard: FC<{ item: Furniture }> = ({ item }) => {
    const randomBool = useMemo(() => Math.random() < 0.5, []);

    return (
      <Block key={item.id} style={{ margin: sizes.s, flex: 1 }}>
        <Image
          source={{ uri: item.imgURL }}
          style={{
            height: randomBool ? 150 : 280,
            alignSelf: "stretch",
          }}
          resizeMode="cover"
        />
        <Text
          style={{
            marginTop: 8,
          }}
        >
          {item.text}
        </Text>
      </Block>
    );
  };

  const renderItem = ({
    item,
  }: {
    item: Furniture;
    index?: number;
  }): ReactElement => {
    return <FurnitureCard item={item} />;
  };

  return (
    <Block
      style={{
        backgroundColor: colors.background,
        justifyContent: "center",
        alignSelf: "center",
      }}
      flex={1}
      center
      isWeb
    >
      <Icon
        color={colors.secondary as string}
        iconType="Ionicons"
        iconName="arrow-back"
        onPress={() => navigation.goBack()}
        style={{ margin: sizes.sm, alignSelf: "flex-start" }}
      />
      <Block
        flex={2}
        style={{
          justifyContent: "center",
          alignSelf: "center",
        }}
        center
        width={"90%"}
        marginVertical={sizes.s}
        outlined
        borderColor={colors.secondary}
        borderWidth={1}
        radius={sizes.sm}
      >
        <Block align="center">
          <Image
            radius={sizes.width * 0.12}
            width={sizes.width * 0.12}
            height={sizes.width * 0.12}
            marginVertical={sizes.s}
            source={{
              uri: "https://firebasestorage.googleapis.com/v0/b/v0-0-beta-nomad.appspot.com/o/profile_example.jpeg?alt=media&token=888b8962-0324-41c0-b314-853cab2449e7",
            }}
          />

          <Text h5 center>
            {user?.username}
          </Text>

          <Block row marginVertical={sizes.m}>
            <Button
              outlined
              shadow={false}
              radius={sizes.m}
              borderColor={colors.secondary}
              marginHorizontal={sizes.s}
            >
              <Block
                justify="center"
                radius={sizes.m}
                paddingHorizontal={sizes.sm}
                color="rgba(255,255,255,0.2)"
              >
                <Text bold transform="uppercase" textSecondary>
                  Follow
                </Text>
              </Block>
            </Button>
            <Button shadow={false} radius={sizes.m}>
              <Block
                justify="center"
                radius={sizes.m}
                paddingHorizontal={sizes.sm}
                align="center"
              >
                <Block align="center">
                  <Text h5>555</Text>
                  <Text>Posts</Text>
                </Block>
              </Block>
            </Button>
            <Button shadow={false} radius={sizes.m}>
              <Block
                justify="center"
                radius={sizes.m}
                paddingHorizontal={sizes.sm}
                align="center"
              >
                <Block align="center">
                  <Text h5>34.5k</Text>
                  <Text>Followers</Text>
                </Block>
              </Block>
            </Button>
          </Block>
        </Block>
        {/* <Block
          margin={sizes.s}
          radius={sizes.sm}
          outlined
          borderColor={colors.secondary}
          borderWidth={1}
        >
          <Icon
            color={colors.secondary as string}
            iconType="Ionicons"
            iconName="arrow-back"
            onPress={() => navigation.goBack()}
            style={{ margin: sizes.sm, alignSelf: "flex-start" }}
          />
          <Block flex={0} align="center">
            <Image
              radius={sizes.width * 0.15}
              width={sizes.width * 0.15}
              height={sizes.width * 0.15}
              marginBottom={sizes.sm}
              source={{
                uri: "https://firebasestorage.googleapis.com/v0/b/v0-0-beta-nomad.appspot.com/o/profile_example.jpeg?alt=media&token=888b8962-0324-41c0-b314-853cab2449e7",
              }}
            />

            <Text h5 center>
              {user?.username}
            </Text>

            <Block row marginVertical={sizes.m}>
              <Button
                outlined
                shadow={false}
                radius={sizes.m}
                borderColor={colors.secondary}
                marginHorizontal={sizes.s}
              >
                <Block
                  justify="center"
                  radius={sizes.m}
                  paddingHorizontal={sizes.sm}
                  color="rgba(255,255,255,0.2)"
                >
                  <Text bold transform="uppercase" textSecondary>
                    Follow
                  </Text>
                </Block>
              </Button>
              <Button shadow={false} radius={sizes.m}>
                <Block
                  justify="center"
                  radius={sizes.m}
                  paddingHorizontal={sizes.sm}
                  align="center"
                >
                  <Block align="center">
                    <Text h5>555</Text>
                    <Text>Posts</Text>
                  </Block>
                </Block>
              </Button>
              <Button shadow={false} radius={sizes.m}>
                <Block
                  justify="center"
                  radius={sizes.m}
                  paddingHorizontal={sizes.sm}
                  align="center"
                >
                  <Block align="center">
                    <Text h5>34.5k</Text>
                    <Text>Followers</Text>
                  </Block>
                </Block>
              </Button>
              <Button shadow={false} radius={sizes.m}>
                <Block
                  justify="center"
                  radius={sizes.m}
                  paddingHorizontal={sizes.sm}
                  align="center"
                >
                  <Block align="center">
                    <Text h5>34</Text>
                    <Text>Following</Text>
                  </Block>
                </Block>
              </Button>
            </Block>
          </Block>
        </Block> */}
      </Block>
      <Block flex={2} scroll>
        <Block row justify="space-between" wrap="wrap">
          <MasonryList
            keyExtractor={(item: Furniture): string => item.id}
            ListHeaderComponent={<View />}
            contentContainerStyle={{
              paddingHorizontal: 24,
              alignSelf: "stretch",
            }}
            numColumns={3}
            data={data}
            renderItem={renderItem}
          />
        </Block>
      </Block>
      <NavBar currentScreen="Profile" />
    </Block>
  );
}
