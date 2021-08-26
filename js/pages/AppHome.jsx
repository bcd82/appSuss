import {AppPreview} from '../cmps/AppPreview.jsx'


export  function AppHome() {
    return (
        <section className="app-home main-layout">
            <h1>Welcome to AppSus</h1>
            <h2>The #1 Keep/Mail/Book App !</h2>
            <div className="app-row">
                <AppPreview title='Keep' txt="Keep Notes of All of Your Favourite Stuff" imgUrl="./assets/imgs/cmps/sticky-notes.jpg"/>
                <AppPreview title='Mail' txt="Keep in Touch With Friends and Enemies" imgUrl="./assets/imgs/cmps/mailbox.jpg"/>
                <AppPreview title='Book' txt="Need a Book? We've Got You Covered!" imgUrl="./assets/imgs/cmps/books.png"/>
            </div>
        </section>
    )
}
