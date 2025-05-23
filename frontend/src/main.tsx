import { ChakraProvider } from "@chakra-ui/react"
import ReactDOM from "react-dom/client"
import { StrictMode } from "react"
import theme from "./theme"
import Route from './router';
import 'slick-carousel/slick/slick.css'
import 'slick-carousel/slick/slick-theme.css'
import 'react-quill/dist/quill.snow.css'




ReactDOM.createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <ChakraProvider theme={theme}>
      <Route />
    </ChakraProvider>
  </StrictMode>,
)
