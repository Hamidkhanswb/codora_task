import React, { useCallback, useEffect, useMemo, useRef, useState } from "react";
import { Alert, Image, ScrollView, StyleSheet, Text, TextInput, TouchableOpacity, View } from "react-native";
import validator from 'validator';
// files
import { colors } from "../assets/style/Colors";
import RBSheet from "react-native-raw-bottom-sheet";
import SelectDropdown from "react-native-select-dropdown";
import BigNumber from "bignumber.js";
import AppDropdown from "../components/dropdowns/AppDropdown";
import { IToken } from "../utils/AppInterfaces";
import AppBottomSheet from "../components/dropdowns/AppBottomSheet";

// consts
const networks = [
    {
        name: 'Standard',
        time: '~30 Seconds',
        ethValue: 0.0076,
        ethUsd: 10.30,
        image: require('../assets/pngs/standard-fee.png')
    },
    {
        name: 'Fast',
        time: '~10 Seconds',
        ethValue: 0.037,
        ethUsd: 3.76,
        image: require('../assets/pngs/fast-fee.png')
    },
];
const tokens: IToken[] = [
    {
        title: 'DAU',
        image: require('../assets/pngs/dao.png')
    },
    {
        title: 'USD',
        image: require('../assets/pngs/usd.png')
    },
]
const balance = 7
const singleTokenPrice = 100    // usd
const transferFee = 10.3

const SendTokensScreen = ({ navigation }: any) => {
    const [sendToken, setSendToken] = useState(tokens[0]);
    const [receiveToken, setReceiveToken] = useState(tokens[1]);
    const [selectedFee, setSelectedFee] = useState(networks[0]);
    const [inputfocused, setInputFocused] = useState(false);
    const [inputError, setInputError] = useState("");
    const [inputValue, setInputValue] = useState('');
    const [receiptData, setReceiptData] = useState({
        usd: 0,
        tokens: 0
    });
    // refs
    const inputRef: any = useRef<TextInput>();
    const refRBSheet = useRef<any>();
    const refRBSheetForInfo = useRef<any>();

    const onChangedText = (text: any) => {
        if (sendToken?.title != 'USD') {
            onChangedTokens(text)
        }
        else {
            onChangedUSD(text)
        }
    }
    const onChangedTokens = (text: string) => {
        if (text == "") {
            setInputError('');
            setInputValue("")
            clearDataForReceipt()
            return;
        }
        if (!validator.isDecimal(text, { no_symbols: true })) {
            setInputError('The value is not a valid number');
            setInputValue("")
            clearDataForReceipt()
            return;
        }
        if (Number(text) <= 0) {
            setInputError('The value must be greater than 0.');
            setInputValue("")
            clearDataForReceipt()
            return;
        }
        // check it exceeds balance or not

        if ((Number(text)) > balance) {
            setInputError('Invalid value, because it exceeds your balance.');
            setInputValue("")
            clearDataForReceipt()
            return;
        }
        // minus the fee 
        if ((Number(text) + 0.1) > balance) {
            setInputError('Invalid value, transaction requires some DAU as fee');
            setInputValue("")
            clearDataForReceipt()
            return;
        }
        // to check upto 18 decimal places.
        const bigNumberValue: any = new BigNumber(text);
        if (bigNumberValue.decimalPlaces() > 18) {
            setInputError('Input must have up to 18 decimal places');
            setInputValue("")
            clearDataForReceipt()
            return;
        }

        // empty the errorString if error does not exist
        setInputError("")
        setInputValue(text)
        // Value is valid and proceed for transfering
        calculateDataForReceipt(Number(text) * singleTokenPrice)

    }
    const onChangedUSD = (text: string) => {
        if (text == "") {
            setInputError('');
            setInputValue("")
            clearDataForReceipt()
            return;
        }

        if (Number(text) <= 0) {
            setInputError('The value must be greater than 0.');
            setInputValue("")
            clearDataForReceipt()
            return;
        }
        // check for total tokens ampount
        if (Number(text) > (balance * singleTokenPrice)) {
            setInputError('The value must be less or equal to balance in USD.');
            setInputValue("")
            clearDataForReceipt()
            return;
        }
        // minus the fee 
        if ((Number(text) + 10.3) > (balance * singleTokenPrice)) {
            setInputError('Invalid value, transaction requires some DAU as fee');
            setInputValue("")
            clearDataForReceipt()
            return;
        }

        // empty the errorString if error does not exist
        setInputError("")
        setInputValue(text)
        clearDataForReceipt()
        // Value is valid and proceed for transfering
        calculateDataForReceipt(Number(text))

    }
    const clearDataForReceipt = () => {
        setReceiptData({
            usd: 0,
            tokens: 0
        });
    }
    const calculateDataForReceipt = (amount: number) => {
        setReceiptData({
            ...receiptData,
            usd: amount,
            tokens: amount / singleTokenPrice
        });
    }
    const NetworkComponent = ({ item, index }: any) => {
        return (
            <TouchableOpacity
                style={{ marginTop: 20 }}
                onPress={() => {
                    refRBSheet?.current?.close()
                    setSelectedFee(item)
                }}
            >
                <View style={[{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', padding: 12, borderRadius: 8, backgroundColor: colors?.greyish, paddingLeft: 8 }, item?.name == selectedFee?.name ? { borderWidth: 2, borderColor: colors?.blue } : {}]}>
                    <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                        <Image
                            source={item?.image}
                            style={{ width: 28, height: 28, marginRight: 8 }}
                        />
                        <View>
                            <Text style={{ fontSize: 14, color: colors?.white, fontWeight: '500' }}>{item?.name}</Text>
                            <Text style={{ fontSize: 10, marginTop: 3, color: colors?.green }}>{item?.time}</Text>
                        </View>
                    </View>
                    <View style={{ flexDirection: 'row' }}>
                        <Text style={{ fontSize: 13, marginRight: 5, color: colors?.white }}>{item?.ethValue} ETH</Text>
                        <Text style={{ fontSize: 13, color: colors?.light_grey_text }}>({item?.ethUsd} USD)</Text>
                    </View>
                </View>
            </TouchableOpacity>
        )
    }

    return (
        <ScrollView
            style={styles?.container}
            contentContainerStyle={{ paddingBottom: 13 }}
        >
            {/* header */}
            <View style={{ flexDirection: 'row', paddingVertical: 4, justifyContent: 'space-between', alignItems: 'center' }}>
                <TouchableOpacity
                    style={{ padding: 12, marginTop: 2 }}
                    onPress={() => { navigation?.goBack() }}
                >
                    <Image
                        source={require('../assets/pngs/arrow-left.png')}
                        style={{ width: 16, height: 16 }}
                    />
                </TouchableOpacity>
                <View style={{ flexDirection: 'row' }}>
                    <Text style={{ fontSize: 21, color: colors?.white, marginRight: 7, fontWeight: 'bold' }}>Send DAU</Text>
                    <View style={{ padding: 5, borderRadius: 30, alignSelf: 'center', justifyContent: 'center', alignItems: 'center', backgroundColor: colors?.grey }}>
                        <Image
                            source={require('../assets/pngs/dao.png')}
                            style={{ width: 17, height: 17 }}
                        />
                    </View>
                </View>
                <View style={{ width: 30, height: 30 }}></View>
            </View>

            {/* sending card */}
            <View style={{ paddingHorizontal: 12, marginTop: 24 }}>
                <View style={{ flexDirection: 'row', justifyContent: 'space-between', paddingHorizontal: 13 }}>
                    <Text style={{ fontSize: 14, color: colors?.grey_text }}>You are sending</Text>
                    <Text style={{ fontSize: 12, marginTop: 2, color: colors?.grey_text }}>Balance: {balance} DAU</Text>
                </View>
                <View style={[{ flexDirection: 'row', justifyContent: 'center', padding: 16, marginTop: 10, backgroundColor: colors?.greyish, borderRadius: 12 }, inputfocused ? { borderWidth: 2, borderColor: colors?.blue } : {}]}>
                    <View style={{ flex: 1 }}>
                        <TextInput
                            ref={inputRef}
                            placeholder={sendToken?.title == 'USD' ? 'Enter USD' : "Enter Tokens"}
                            placeholderTextColor={colors?.light_grey_text}
                            keyboardType="numeric"
                            numberOfLines={1}
                            onChangeText={(e) => {
                                onChangedText(e)
                            }}
                            clearButtonMode="always"
                            onFocus={() => { setInputFocused(true) }}
                            onBlur={() => { setInputFocused(false) }}
                            style={{
                                flex: 1,
                                height: 10,
                                paddingLeft: 0,
                                color: colors?.white,
                                fontSize: 24,
                                fontWeight: 'bold'
                            }}
                        // value={field.value}
                        />
                        <Text style={{ fontSize: 12, color: colors?.grey_text, marginTop: -5 }}>{sendToken?.title != 'USD' ? (Number(inputValue) * singleTokenPrice) + " USD" : (Number(inputValue) / singleTokenPrice) + " DAO"}</Text>
                    </View>
                    <AppDropdown
                        tokens={tokens}
                        activeToken={sendToken}
                        onSelect={(selectedItem: any, index: number) => {
                            setSendToken(selectedItem);
                            // clear the values
                            setInputValue("");
                            setInputError("")
                            clearDataForReceipt()
                            inputRef?.current?.clear()
                        }}
                    />
                </View>
            </View>
            {
                inputError != "" &&
                <Text style={{ color: colors?.red, paddingHorizontal: 15, marginTop: 3 }}>{inputError}</Text>
            }
            {/* receiving card */}
            <View style={{ paddingHorizontal: 12, justifyContent: 'center', marginTop: 24 }}>
                <View style={{ flexDirection: 'row', justifyContent: 'space-between', paddingHorizontal: 13 }}>
                    <Text style={{ fontSize: 14, color: colors?.grey_text }}>Recipient Receives</Text>
                </View>
                <View style={{ flexDirection: 'row', justifyContent: 'center', padding: 16, marginTop: 10, backgroundColor: colors?.greyish, borderWidth: 2, borderColor: colors?.greyish_border, borderRadius: 12 }}>
                    <View style={{ flex: 1, justifyContent: 'center' }}>
                        <Text style={{ color: colors?.white, fontSize: 24, fontWeight: 'bold' }}>{receiveToken?.title == 'USD' ? receiptData?.usd : receiptData?.tokens}</Text>
                        <Text style={{ fontSize: 12, marginTop: 5, color: colors?.grey_text }}>{receiveToken?.title == 'USD' ? receiptData?.tokens + " DAU" : receiptData?.usd + " USD"} </Text>
                    </View>
                    <AppDropdown
                        tokens={tokens}
                        activeToken={receiveToken}
                        onSelect={(selectedItem: any, index: number) => {
                            setReceiveToken(selectedItem);
                        }}
                    />

                </View>
            </View>

            {/* footer */}
            <View style={{ marginTop: 60, paddingHorizontal: 12, borderTopWidth: 1, borderColor: colors?.greyish_border }}>
                <View style={{ flexDirection: 'row', marginTop: 20, alignItems: 'center', justifyContent: 'space-between' }}>
                    <View style={{ flexDirection: 'row', justifyContent: 'center', alignItems: 'center' }}>
                        <Text style={{ fontSize: 10, color: colors?.light_grey_text }}>Network fees</Text>
                        <TouchableOpacity
                            style={{ padding: 7 }}
                            onPress={() => refRBSheetForInfo?.current?.open()}
                        >
                            <Image
                                source={require('../assets/pngs/info.png')}
                                style={{ width: 12, height: 12 }}
                            />
                        </TouchableOpacity>
                    </View>
                    <TouchableOpacity
                        style={{ flexDirection: 'row', alignItems: 'center', borderWidth: 1, borderColor: colors?.bluish_border, borderRadius: 5, backgroundColor: colors?.dark_bluish, paddingLeft: 8 }}
                        onPress={() => { refRBSheet.current.open() }}
                    >
                        <Image
                            source={selectedFee?.image}
                            style={{ width: 10, height: 10 }}
                        />
                        <Text style={{ fontSize: 10, marginHorizontal: 5, color: colors?.light_grey_text }}>{selectedFee?.name}</Text>
                        <Text style={{ fontSize: 10, marginRight: 5, color: colors?.white }}>{selectedFee?.ethValue} ETH</Text>
                        <Text style={{ fontSize: 10, color: colors?.light_grey_text }}>({selectedFee?.ethUsd} USD)</Text>
                        <View style={{ paddingHorizontal: 10, paddingVertical: 8 }}>
                            <Image
                                source={require('../assets/pngs/arrow-down.png')}
                                style={{ width: 10, height: 10, tintColor: 'white' }}
                            />
                        </View>
                    </TouchableOpacity>
                </View>
                <View style={{ flexDirection: 'row', marginTop: 10, alignItems: 'center', justifyContent: 'space-between' }}>
                    <Text style={{ fontSize: 10, color: colors?.light_grey_text }}>Transfer fees</Text>
                    <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                        <Text style={{ fontSize: 10, marginRight: 5, color: colors?.white }}>0.1 DAU</Text>
                        <Text style={{ fontSize: 10, color: colors?.light_grey_text }}>({transferFee} USD)</Text>
                    </View>
                </View>

                <TouchableOpacity
                    style={[{ justifyContent: 'center', alignItems: 'center', height: 48, marginTop: 30, backgroundColor: colors?.red, borderRadius: 12 }, Number(inputValue) > 0 ? { opacity: 1 } : { opacity: 0.3 }]}
                    onPress={() => {
                        if (Number(inputValue) > 0) {
                            Alert.alert("Value is valid and you can transfer tokens.")
                        }
                    }}
                    disabled={Number(inputValue) > 0 ? false : true}
                >
                    <Text style={{ fontSize: 16, color: colors?.white, fontWeight: '700' }}>Next</Text>
                </TouchableOpacity>
            </View>

            {/* bottom heet */}
            {/* <RBSheet
                ref={refRBSheet}
                draggable
                dragOnContent
                closeOnPressBack
                // useNativeDriver={true}
                customStyles={{
                    wrapper: {
                        backgroundColor: 'transparent',
                    },
                    container: {
                        height: 'auto',
                        backgroundColor: '#1c1b1b'
                    },
                    draggableIcon: {
                        backgroundColor: colors?.light_grey_text,
                    },
                }}
                customModalProps={{
                    animationType: 'slide',
                    statusBarTranslucent: true,
                }}
                customAvoidingViewProps={{
                    enabled: false,
                }}
            >
                <View style={{ marginBottom: 20, paddingHorizontal: 12 }}>
                    <Text style={{ fontSize: 17, color: colors?.white, fontWeight: '600' }}>Network Fee</Text>
                    {
                        networks?.map((item, index) => {
                            return (
                                <NetworkComponent
                                    key={index}
                                    item={item}
                                    index={index}
                                />
                            )
                        })
                    }
                </View>
            </RBSheet> */}
            <AppBottomSheet
                reference={refRBSheet}
                children={
                    <View style={{ marginBottom: 20, paddingHorizontal: 12 }}>
                        <Text style={{ fontSize: 17, color: colors?.white, fontWeight: '600' }}>Network Fee</Text>
                        {
                            networks?.map((item, index) => {
                                return (
                                    <NetworkComponent
                                        key={index}
                                        item={item}
                                        index={index}
                                    />
                                )
                            })
                        }
                    </View>
                }
            />
            {/* info bottom heet */}
            <AppBottomSheet
                reference={refRBSheetForInfo}
                children={
                    <View style={{ marginBottom: 20, alignItems: 'center', paddingHorizontal: 12 }}>
                        <TouchableOpacity
                            style={{ position: 'absolute', right: 12, top: -5, padding: 9, borderRadius: 30, backgroundColor: colors?.light_grey }}
                            onPress={() => { refRBSheetForInfo?.current?.close() }}
                        >
                            <Image
                                source={require('../assets/pngs/cross.png')}
                                style={{ width: 13, height: 13 }}
                            />
                        </TouchableOpacity>
                        <View style={{ padding: 8, marginTop: 20, borderRadius: 30, alignSelf: 'center', justifyContent: 'center', alignItems: 'center', backgroundColor: colors?.grey }}>
                            <Image
                                source={require('../assets/pngs/dao.png')}
                                style={{ width: 36, height: 36 }}
                            />
                            <Image
                                source={require('../assets/pngs/ethereum.png')}
                                style={{ position: 'absolute', bottom: -5, right: 0, width: 16, height: 16 }}
                            />
                        </View>
                        <Text style={{ fontSize: 18, marginTop: 17, color: colors?.white, fontWeight: '600' }}>What is network fee?</Text>
                        <Text style={styles?.networkFeeText}>This is the estimated fee paid to miners who process your transaction over blockchain.</Text>
                        <Text style={styles?.networkFeeText}>This fee would vary depending on transaction complexity and network traffic.</Text>
                        <TouchableOpacity
                            style={{ justifyContent: 'center', width: '100%', alignItems: 'center', height: 48, marginTop: 30, backgroundColor: colors?.red, borderRadius: 12 }}
                            onPress={() => { refRBSheetForInfo?.current?.close() }}
                        >
                            <Text style={{ fontSize: 16, color: colors?.white, fontWeight: '700' }}>Got it</Text>
                        </TouchableOpacity>
                        <Text style={{ fontSize: 10, marginTop: 25, color: colors?.white, textDecorationLine: 'underline' }}>Fee settings</Text>
                    </View>
                }
            />
        </ScrollView>
    )
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: colors?.dark,
    },
    contentContainer: {
        flex: 1,
        alignItems: 'center',
        backgroundColor: 'red'
    },
    dropdownMenuStyle: {
        backgroundColor: 'transparent',
        borderRadius: 8,
    },
    networkFeeText: {
        color: colors?.light_grey_text,
        marginTop: 20,
        lineHeight: 20,
        paddingHorizontal: 30,
        textAlign: 'center'
    }
});

export default SendTokensScreen