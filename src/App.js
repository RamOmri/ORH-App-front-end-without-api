import {
  createStackNavigator,
  createSwitchNavigator,
  createDrawerNavigator
} from 'react-navigation';
import LoginScreen from './LoginScreen'
import HomeScreen from './HomeScreen'
import ScanScreen from './ScanScreen'
import ReloadScreen from './ReloadScreen'
import Menu from './Menu'
import StockDispatch from './StockDispatch'
import StockItem from './StockItem'
import StockPreview from './StockPreview'
import EditPreviewItem from './EditPreviewItem'
import StockReceipt from './StockReceipt'
import ReceiptPreview from './ReceiptPreview'
import ReceiptPreviewEdit from './ReceiptPreviewEdit'
import Requisition from './Requisition'
import RequisitionItems from './RequisitionItems'
import RequisitionPreview from './RequisitionPreview'
import RequisitionEdit from './RequisitionEdit'
import BarCodeScanner from './BarCodeScanner'
import PhotoUploadScreen from './PhotoUploadScreen'
import PhotoJobSelect from './PhotoJobSelect'

const AuthStack = createStackNavigator({
  LoginScreen: {
    screen: LoginScreen
  },  
},

);
const MainStack = createStackNavigator({ 
 
  Menu: {
    screen: Menu
  },
  StockDispatch: {
    screen: StockDispatch
  },
  StockItem: {
    screen: StockItem
  },
   HomeScreen: {
    screen: HomeScreen
  },
   ScanScreen: {
    screen: ScanScreen
  },
  ReloadScreen: {
    screen: ReloadScreen
  },
 StockPreview: {
    screen: StockPreview
 },
 EditPreviewItem: {
   screen: EditPreviewItem
 },
  StockReceipt: {
    screen: StockReceipt
  },
  ReceiptPreview: {
    screen: ReceiptPreview
  },
  ReceiptPreviewEdit: {
    screen: ReceiptPreviewEdit
  },
  Requisition: {
    screen: Requisition
  },
  RequisitionItems: {
    screen: RequisitionItems
  },
  RequisitionPreview : {
    screen: RequisitionPreview
  },
  RequisitionEdit: {
    screen: RequisitionEdit
  },
  BarCodeScanner : {
    screen: BarCodeScanner
  }, 
  PhotoUploadScreen: {
    screen : PhotoUploadScreen
  },
  PhotoJobSelect : {
    screen : PhotoJobSelect
  }
},

);

export default AppStack = createStackNavigator({
  AuthStack: {
    screen: AuthStack
  },
  MainStack: {
    screen: MainStack
  },
  
 
  
}, {
  navigationOptions: ({
    navigation
  }) => {

    return {
      header: null,
    };


  }
});

