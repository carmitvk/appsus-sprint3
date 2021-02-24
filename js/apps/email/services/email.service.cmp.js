

import { storageService } from '../../../services/async-storage-service'
import { utilService } from '../../../services/util-service'



const INBOX_EMAILS_KEY = 'inbox_emails'
const gEmails = [
                    {id:'XXXXX', subject: 'Wassap?',  body: 'Pick up!',      isRead: false, sentAt : 1551133930594},
                    {id:'YYYYY', subject: 'Hi there', body: 'where are you', isRead: true,  sentAt : 1551133930594},
                    {id:'ZZZZZ', subject: 'Hello',    body: 'long time',     isRead: false, sentAt : 1551133930594}
];


export const emailService = {
  query,
  remove,
  save,
  getEmptyEmail,
  getById,
  getNextEmailId,
  getPrevEmailId,
}




function query() {
  return storageService.query(INBOX_EMAILS_KEY)
    .then(emails=> {
      if (!emails||!emails.length){
        emails = gEmails;
        utilService.saveToStorage(INBOX_EMAILS_KEY,gEmails)
      }
    //   return Promise.resolve(email);
    return emails;
    });
}

function remove(emailId) {
  storageService.remove(INBOX_EMAILS_KEY, emailId);
}

function save(email) {
  if (email.id) { //edit
    return storageService.put(INBOX_EMAILS_KEY, email)
  } else {
    return storageService.post(INBOX_EMAILS_KEY, email)
  }
}

function getEmptyEmail() { //for compose
  return {id:utilService.makeId(), subject: 'subject', body: 'Email body', isRead: false, sentAt : 1551133930594}
}


function getById(id) {
  return storageService.get(INBOX_EMAILS_KEY, id)
}

// function _createEmails() {
//   let emails = utilService.loadFromStorage(INBOX_EMAILS_KEY)
//   if (!emails || !emails.length) {
//     emails=[
//         {}

//     ]

//     utilService.saveToStorage(INBOX_EMAILS_KEY, emails)
//   }
//   return emails;
// }



function getNextEmailId(emailId) {
    //get the emails from storage
    let emails = utilService.loadFromStorage(INBOX_EMAILS_KEY);
    let currEmailIdx = emails.findIndex(email => email.id === emailId)
    if (currEmailIdx === emails.length-1) return null;
    return emails[currEmailIdx + 1].id;
  }
  
  function getPrevEmailId(emailId) {
    let emails = utilService.loadFromStorage(INBOX_EMAILS_KEY);
    let currEmailIdx = emails.findIndex(email => email.id === emailId)
    if (currEmailIdx === 0) return null;
    return emails[currEmailIdx - 1].id;
  }