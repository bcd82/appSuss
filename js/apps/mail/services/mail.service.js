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
        body: `Hi Barak , 
        Unity’s Integrated Success Services (ISS) team helps developers avoid obstacles and 
        resolve issues before they negatively impact productivity (and ultimately players!) 
        Each client is assigned a Developer Relations Manager (DRM) who works closely with the team to help them isolate any bugs and responds to questions or problems. Unity Developer Relations Engineers (DREs) also perform in-depth Project Reviews that dig into every aspect of a project’s build to ensure that each phase, from planning to post-launch, is executed smoothly.
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
        body: `התאם להנחיות משרד הבריאות, אנו מזמינים אותך להתחסן במנה 3 של חיסון נגד נגיף הקורונה.

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
        body: utilService.makeLorem(22),
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
        body: utilService.makeLorem(22),
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
        body: utilService.makeLorem(22),
        isRead: false,
        sentAt: null,
        to: 'someone@something.smt',
        status: 'draft',
        isStarred: false,
        from: loggedInUser.email,
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
                        console.log('deleted?')
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
    .then(mail => mail.status ='sent')
    return Promise.resolve()
}

function saveDraft(draft,mailId) { 
    if(mailId){
        getMailById(mailId)
        .then(mail => {
            mail.subject = draft.subject
            mail.body = draft.body
            mail.to = draft.to
            mail.sentAt = Date.now()
            eventBusService.emit('user-msg',{ txt: 'Draft Updated', type: 'success' })
        })

    } else {
        gMails.unshift({
            id: utilService.makeId(),
            from:loggedInUser.email,
            subject:draft.subject,
            to:draft.to,
            body:draft.body,
            isRead: false,
            isStarred: false,
            sentAt: Date.now(),
            status: 'draft',
        })
        eventBusService.emit('user-msg', { txt: 'Draft Saved', type: 'success' })

    }
    return Promise.resolve()
}