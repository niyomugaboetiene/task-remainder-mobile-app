import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import Dashboard from '@/components/Dashboard';
import SignUp from '@/components/SignUp';
import SignIn from './SignIn';
import AddTask from './AddTask';
const Tab = createBottomTabNavigator();
function Tabs() {
    return (
          <Tab.Navigator initialRouteName='Sign-up'
                 screenOptions={{
                  headerShown: false
                 }}
               >
                    <Tab.Screen name="Home" component={Dashboard} />
                    <Tab.Screen name="Sign-in" component={SignIn} />
                    <Tab.Screen name="Sign-up" component={SignUp} />
                    <Tab.Screen name="Add-Task" component={AddTask} />
              </Tab.Navigator>
    )
}