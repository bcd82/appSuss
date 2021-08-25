import {AppPreview} from '../cmps/AppPreview.jsx'

export  function AppHome() {
    return (
        <section className="app-home main-layout">
            <h1>Welcome to AppSus</h1>
            <div className="app-row">
                <AppPreview txt="Keep" imgUrl="#"/>
                <AppPreview txt="Mail" imgUrl="#"/>
                <AppPreview txt="Book" imgUrl="#"/>
            </div>
        </section>
    )
}
