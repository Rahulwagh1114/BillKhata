import Card from "./Card";
import Footer from "./Footer";
import Hero from "./Hero";
import HomeBusinessTy from "./HomeBusinessTy";
import HomeInvoice from "./HomeInvoice";
import Navbar from "./Navbar";
function Home(){
    return(
        <>
        <Navbar/>
        <Hero/>
        <Card/>
        <HomeInvoice/>
        <HomeBusinessTy/>
        <Footer/>
        </>
    )
}
export default Home;