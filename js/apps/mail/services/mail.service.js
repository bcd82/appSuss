import { storageService } from '../../../services/storage.service.js'
import { utilService } from '../../../services/util.service.js'
import { eventBusService } from '../../../services/event.bus.service.js'


export const mailService = {
    getMails,
    toggleStar,
    getMailById,
    toggleRead,
    deleteMail,
    addToInbox,
    getUser,
    createMail,
    moveDraftToSent,
    saveDraft
}
const DB_KEY = 'mailsDb'

const loggedInUser = {
    email: 'barak.sidi@gmail.com',
    fullName: 'Barak Sidi'
}
const staticMails = [
    {
        id: utilService.makeId(),
        subject: 'Hi there',
        body: 'What\'s up ? How Are you ? ',
        isRead: false,
        sentAt: Date.now() - 120000,
        to: loggedInUser.email,
        status: 'inbox',
        isStarred: false,
        from: 'moshe@zmail.com'
    },
    {
        id: utilService.makeId(),
        subject: 'How Unity can help keep your game development on track',
        body: `
        Hi Barak , 
        
        Unity’s Integrated Success Services (ISS) team helps developers avoid obstacles and 
        resolve issues before they negatively impact productivity (and ultimately players!) 
        Each client is assigned a Developer Relations Manager (DRM) who works closely with the team to 
        help them isolate any bugs and responds to questions or problems. 
        Unity Developer Relations Engineers (DREs) also perform in-depth Project Reviews that dig 
        into every aspect of a project’s build to ensure that each 
        phase, from planning to post-launch, is executed smoothly.
        Hound13 engaged with Unity’s Integrated Success Services (ISS) for animation help while 
        building Hundred Soul, a stunning mobile ARPG that became an international hit. 
        We’d love to help your team save time and resources while ensuring your games ship on time,
        so click here to learn more about Unity ISS.
        
         Game On!
        The Unity Team`,
        isRead: false,
        sentAt: 1629800000635,
        to: loggedInUser.email,
        status: 'inbox',
        isStarred: false,
        from: 'unity@unity.com'
    },
    {
        id: utilService.makeId(),
        subject: 'אנחנו מזמינים אותך להתחסן במנה 3 של חיסון נגד נגיף קורונה!',
        body: `
        התאם להנחיות משרד הבריאות, אנו מזמינים אותך להתחסן במנה 3 של חיסון נגד נגיף הקורונה.

        בשבועות האחרונים אנו עדים לעלייה בתחלואה, ומטרת מנת החיסון הנוספת היא חיזוק ההגנה החיסונית שלך נגד נגיף הקורונה.`,
        isRead: true,
        sentAt: 1625700000635,
        to: loggedInUser.email,
        status: 'inbox',
        isStarred: true,
        from: 'do-not-reply@info.maccabi4u.co.il'
    },
    {
        id: utilService.makeId(),
        subject: 'Sent Message to Someone who is not myself',
        body: utilService.makeLorem(32),
        isRead: true,
        sentAt: 1541133290194,
        to: 'someone@else.il',
        status: 'sent',
        isStarred: false,
        from: loggedInUser.email,
    },
    {
        id: utilService.makeId(),
        subject: 'Message in trash',
        body: utilService.makeLorem(102),
        isRead: true,
        sentAt: 1341133290194,
        to: loggedInUser.email,
        status: 'trash',
        isStarred: false,
        from: 'spam@spamsters.spm',
    },
    {
        id: utilService.makeId(),
        subject: 'Message in draft',
        body: utilService.makeLorem(52),
        isRead: true,
        sentAt: null,
        to: 'someone@something.smt',
        status: 'draft',
        isStarred: false,
        from: loggedInUser.email,
    },
    {
        id: utilService.makeId(),
        subject: 'Changes to YouTube’s Terms of Service',
        body: `
        You’re receiving this email because we’re updating the YouTube Terms of Service (“Terms”) 
        to clarify our terms and provide transparency to our users. 
        The Terms were similarly updated in the United States in November 2020. 
        These changes shouldn't significantly alter your access or use of the YouTube service.
        A summary of the changes:
        
        Facial recognition restrictions: The Terms of Service already state that you cannot collect 
        any information that might identify a person without their permission.
        While this has always included facial recognition information,
        the new Terms make that explicitly clear.
        YouTube’s right to monetize: 
        YouTube has the right to monetize all content on the platform and ads may appear on videos from
         channels not in the YouTube Partner Program.
        Royalty payments and tax withholding: 
        For creators entitled to revenue payments, such payments will be treated as royalties from a 
        U.S. tax perspective and Google will withhold taxes where required by law.
         
        Please make sure you read the updates to the Terms carefully.
        if you allow your child to use YouTube Kids, then you are agreeing to the new Terms on 
        behalf of your child as well.
        
        If you would like more information, visit our Help Center.`,
        isRead: false,
        sentAt: Date.now() -220000,
        to: loggedInUser.email,
        status: 'inbox',
        isStarred: false,
        from: 'no-reply@youtube.com',
    },
    {
        id: utilService.makeId(),
        subject: 'You received a new comment on Superstition - animated short',
        body: `
        Hi Superstition Animation, 
        Silas Syhler 6U Katrinedalskolen commented on your video Superstition - animated short:
        "this man is ugly AF"
        `,
        isRead: false,
        sentAt: Date.now() -11259000,
        to: loggedInUser.email,
        status: 'inbox',
        isStarred: false,
        from: 'vimeo@email.vimeo.com',
    },
    {
        id: utilService.makeId(),
        subject: 'Attn: There’s a Birthday Surprise waiting for You',
        body:utilService.makeLorem(190),
        isRead: false,
        sentAt: Date.now() -2296000,
        to: loggedInUser.email,
        status: 'trash',
        isStarred: false,
        from: 'scam@scammy.io',
    },
    {
        id: utilService.makeId(),
        subject: 'what is the hardest part of game development?',
        body:`
        Hey,

        I'm compiling a list of what people think is the hardest part of game development! Shoot me a reply and let me know!
        Thx,
        
        Rocco at simmer.io
        Unsubscribe`,
        isRead: false,
        sentAt: Date.now() -2409550,
        to: loggedInUser.email,
        status: 'inbox',
        isStarred: true,
        from: 'rocco@simmer.io',
    },
    {
        id: utilService.makeId(),
        subject: 'היי :)',
        body:`
        היי, מה שלומך?

        נעים מאוד 😊 דנית מחברת TechJob.
        כחלק ממאמצי החיפוש שלי אחר טאלנטים מובילים עבור חברה מדהימה שאני עובדת איתה, חשבתי שאולי אוכל לעניין אותך :)
        מדובר בחברה בתל אביב, שעובדת במודל עבודה היברידי, אנשים מדהימים !
        
        אשמח לבדוק התאמה ולעניין אותך במשרה.
        מה דעתך? אפשר לשלוח לך פירוט אודות המשרה?
        
        נ.ב
        במידה ויש לך חברים שיכול לעניין אותם אתגר חדש בחברות באמת מעולות, אשמח לקבל פרטים/קו"ח/לינקדאין.
        אנחנו מתגמלים ממש יפה על שידוכים מוצלחים.
        
        שבוע מעולה,
        דנית`,
        isRead: true,
        sentAt: Date.now() -11209550,
        to: loggedInUser.email,
        status: 'inbox',
        isStarred: true,
        from: 'Danit@tech-job.co.il',
    },
    {
        id: utilService.makeId(),
        subject: 'Your notifications are now mobile',
        body:`
        Your notifications are now mobile!
        You’ve enabled push notifications on your mobile device for the Coding Academy - Jul 21 workspace, 
        so we’ve disabled email notifications for you.
        That way you won’t get notified twice. It’s easy to re-enable email notifications, if you’d prefer.`,
        isRead: true,
        sentAt: Date.now() -1121209550,
        to: loggedInUser.email,
        status: 'inbox',
        isStarred: true,
        from: 'feedback@slack.com',
    },
]

let gMails = storageService.loadFromStorage(DB_KEY) || staticMails;

function getMails() {
    _saveMails()
    return Promise.resolve(gMails)
}

function getUser() {
    return Promise.resolve(loggedInUser)
}

function getMailById(mailId) {
    const mail = gMails.find(mail => mail.id === mailId)
    return Promise.resolve(mail)
}
function getMailIdxById(mailId) {
    const mailIdx = gMails.findIndex(mail => mail.id === mailId)
    return Promise.resolve(mailIdx)
}

function toggleStar(mailId) {
    getMailById(mailId)
        .then((mail) => {
            mail.isStarred = !mail.isStarred
            _saveMails()
        })
    return Promise.resolve()
}

function toggleRead(mailId, isOnOpen = false) {
    getMailById(mailId)
        .then((mail) => {
            isOnOpen ? mail.isRead = true : mail.isRead = !mail.isRead
            _saveMails()
        })
    return Promise.resolve()
}

function deleteMail(mailId) {
    getMailById(mailId)
        .then(mail => {
            if (mail.status === 'trash') {
                getMailIdxById(mailId)
                    .then(mailIdx => {
                        gMails.splice(mailIdx, 1)
                        eventBusService.emit('user-msg', { txt: 'Mail Permenantly Deleted', type: 'delete' })
                    })
            } else {
                mail.status = 'trash'
                eventBusService.emit('user-msg', { txt: 'Mail Moved To Trash', type: 'delete' })
            }
        }
        )
    _saveMails()
    return Promise.resolve()
}

function addToInbox(mailId) {
    getMailById(mailId)
        .then(mail => mail.status = 'inbox')
    _saveMails()
    return Promise.resolve()
}

function _saveMails() {
    storageService.saveToStorage(DB_KEY, gMails)
}

function createMail({ subject, to, body, from }) {
    gMails.unshift({
        id: utilService.makeId(),
        from,
        subject,
        to,
        body,
        isRead: true,
        isStarred: false,
        sentAt: Date.now(),
        status: 'sent',
    })
    return Promise.resolve()
}

function moveDraftToSent(mailId) {
    getMailById(mailId)
        .then(mail => mail.status = 'sent')
    return Promise.resolve()
}

function saveDraft(draft, mailId) {
    if (mailId) {
        getMailById(mailId)
            .then(mail => {
                mail.subject = draft.subject
                mail.body = draft.body
                mail.to = draft.to
                mail.sentAt = Date.now()
                eventBusService.emit('user-msg', { txt: 'Draft Updated', type: 'success' })
            })

    } else {
        gMails.unshift({
            id: utilService.makeId(),
            from: loggedInUser.email,
            subject: draft.subject,
            to: draft.to,
            body: draft.body,
            isRead: false,
            isStarred: false,
            sentAt: Date.now(),
            status: 'draft',
        })
        eventBusService.emit('user-msg', { txt: 'Draft Saved', type: 'success' })

    }
    return Promise.resolve()
}