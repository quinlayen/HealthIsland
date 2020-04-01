import axios from "axios";

const fitbitToken = axios.create({
  baseURL: "https://api.fitbit.com/oauth2/token"
});

fitbitToken.interceptors.request.use(config => {
  console.log("request sent");
  return config;
});


//fitbitToken.interceptors.response.use(response => {return response})


// const setInterceptors = async () => {
//     try {
//       await axios.interceptos.response.use(
//         response => {
//           return response;
//         },
//         error => {
//           const {
//             response: { status, data }
//           } = error;

//           if (status === 401 && data.message === "Expired token") {
//             if (!this.state.isRefreshing) {
//               this.setState({ isRefreshing: true });
//               this.refreshFitbitToken();
//               if (status === 200 || status === 204) {
//                 this.setState({ isRefreshing: true });
//               }
//             }
//           }
//         }
//       );
//     } catch (error) {
//       console.log(error);
//     }
//   };
export default { fitbitToken};
