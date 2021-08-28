import {AppPreview} from '../cmps/AppPreview.jsx'
import { HomeProfile } from '../cmps/HomeProfile.jsx'


export  function AppHome() {
    return (
        <section className="app-home main-layout">
            <h1>Welcome to AppSus</h1>
            <h2>The #1 Keep/Mail/Book App !</h2>
            <div className="app-row">
                <AppPreview title='Keep' txt="Keep Notes of All of Your Favourite Stuff" imgUrl="./assets/imgs/cmps/sticky-notes.jpg" url="/keep/"/>
                <AppPreview title='Mail' txt="Keep in Touch With Friends and Enemies" imgUrl="./assets/imgs/cmps/mailbox.jpg" url="/mail?filter=inbox"/>
                <AppPreview title='Book' txt="Need a Book? We've Got You Covered!" imgUrl="./assets/imgs/cmps/books.png" url="/book/"/>
            </div>
            <section className="about">
                <HomeProfile imgUrl='./assets/imgs/cmps/barak-sidi.jpg' title='Full Stack Ninja' />
                <HomeProfile imgUrl='./assets/imgs/cmps/ron-buchris.jpeg' title='Coding Academy Student'/>
            </section>
        </section>
    )
}
