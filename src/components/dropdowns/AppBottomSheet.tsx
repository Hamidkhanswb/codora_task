import React from "react";
import { StyleSheet } from "react-native";
// files
import RBSheet from "react-native-raw-bottom-sheet";
import { colors } from "../../assets/style/Colors";

interface IAppBottomSheet{
    reference: any,
    children?: any;
}

const AppBottomSheet = (data: IAppBottomSheet) => {
    return (
        <RBSheet
            ref={data?.reference}
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
            {data?.children}
        </RBSheet>
    )
};

const styles = StyleSheet.create({
})

export default AppBottomSheet;