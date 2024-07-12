import React from "react";
import { Image, StyleSheet, Text, View } from "react-native";
// files
import SelectDropdown from "react-native-select-dropdown";
import { colors } from "../../assets/style/Colors";
import { IAppDropDown } from "../../utils/AppInterfaces";

const AppDropdown = (data: IAppDropDown) => {
    return (
        <SelectDropdown
            data={data?.tokens}
            defaultValue={data?.activeToken}
            onSelect={(selectedItem, index) => data?.onSelect(selectedItem, index)}
            renderButton={(selectedItem, isOpened) => {
                return (
                    <View style={{ padding: 10, flexDirection: 'row' }}>
                        <View
                            style={{ flexDirection: 'row', borderWidth: 1, borderColor: colors?.greyish_border, padding: 10, borderRadius: 12, alignSelf: 'center', justifyContent: 'center', alignItems: 'center', backgroundColor: '#2d2e2e' }}
                        // onPress={() => { }}
                        >
                            <Image
                                source={selectedItem?.image}
                                style={{ width: 18, height: 18 }}
                            />
                            <Text style={{ fontSize: 12, fontWeight: 'bold', color: colors?.light_grey_text, marginHorizontal: 8 }}>{selectedItem?.title}</Text>
                            {
                                isOpened ?
                                    <Image
                                        source={require('../../assets/pngs/arrow-up.png')}
                                        style={{ width: 10, height: 10, tintColor: colors?.light_grey }}
                                    />
                                    :
                                    <Image
                                        source={require('../../assets/pngs/arrow-down.png')}
                                        style={{ width: 12, height: 12 }}
                                    />
                            }
                        </View>
                    </View>
                );
            }}
            renderItem={(item, index, isSelected) => {
                return (
                    <View style={[{ alignSelf: 'center', marginBottom: 4, flexDirection: 'row' }, item?.title == data?.activeToken?.title ? { borderWidth: 1, borderRadius: 12, borderColor: colors?.blue } : {}]}>
                        <View
                            style={{ flexDirection: 'row', borderWidth: 1, borderColor: colors?.greyish_border, padding: 10, borderRadius: 12, alignSelf: 'center', justifyContent: 'center', alignItems: 'center', backgroundColor: '#2d2e2e' }}
                        // onPress={() => { }}
                        >
                            <Image
                                source={item?.image}
                                style={{ width: 18, height: 18 }}
                            />
                            <Text style={{ fontSize: 12, fontWeight: 'bold', color: colors?.light_grey_text, marginHorizontal: 8 }}>{item?.title}</Text>
                            <View style={{ width: 12, height: 12 }}></View>
                        </View>
                    </View>
                );
            }}
            showsVerticalScrollIndicator={false}
            dropdownStyle={styles?.dropdownMenuStyle}
        />
    )
};

const styles = StyleSheet.create({
    dropdownMenuStyle: {
        backgroundColor: 'transparent',
        borderRadius: 8,
    },
})

export default AppDropdown;