

import { storageService } from '../../../services/async-storage-service.js'
import { utilService } from '../../../services/util-service.js'


var gUnreadEmails=2;

const INBOX_EMAILS_KEY = 'inbox_emails'
const gInboxEmails = [
                    {id:'XXXXX', subject: 'Wassap?',  body: 'Hurry To Pick up!',      isRead: false, isStar:false, sentAt : 1551133930594,from:'Nati Golan',to:'Yoni Dalal'},
                    {id:'YYYYY', subject: 'Team meeting for the two teams', body: 'where are you? long time no seen. we have a team meeting for the two teams.you re invited', isRead: true,  isStar:true,  sentAt : 1551133930594,from:'Shlomi Levi',to:'Ronit Band'},
                    {id:'ZZZZZ', subject: 'Hello from me',    body: 'long time',     isRead: false, isStar:false, sentAt : 1551133930594,from:'Elad Davidi',to:'Miri Cohen'}
];


export const emailService = {
  query,
  remove,
  save,
  getEmptyEmail,
  getById,
  getNextEmailId,
  getPrevEmailId,
  getUnreadCount,
  updateStar,
  updateRead,
}

function query() {
  return storageService.query(INBOX_EMAILS_KEY)
    .then(emails=> {
      if (!emails||!emails.length){
        emails = gInboxEmails;
        utilService.saveToStorage(INBOX_EMAILS_KEY,gInboxEmails)
      }
    //   return Promise.resolve(email);
    return emails;
    });
}

function remove(emailId) {
  return storageService.remove(INBOX_EMAILS_KEY, emailId);
}

function updateStar(emailId){
  return getById(emailId)
  .then((email)=>{
    email.isStar = !email.isStar;
    return storageService.put(INBOX_EMAILS_KEY, email)
  })

}

function updateRead(emailId){
  return getById(emailId)
  .then((email)=>{
    if (email.isRead){
      _markAsUnread(emailId);
    }else{
      _markAsRead(emailId);
    }
    return storageService.put(INBOX_EMAILS_KEY, email)
  })
  
}

function save(email) {
  if (email.id) { //edit
    return storageService.put(INBOX_EMAILS_KEY, email)
  } else {
    return storageService.post(INBOX_EMAILS_KEY, email)
  }
}

function getEmptyEmail() { //for compose
  return {id:utilService.makeId(), subject: 'subject', body: 'Email body', isRead: false, isStar:false, sentAt : 1551133930594,from:'Default Sender',to:'Default Reciever'}
}


function getById(id) {
  return storageService.get(INBOX_EMAILS_KEY, id)
}


function _markAsUnread(id){
    return getById(id)
    .then((email)=>{
      email.isRead = false;
      gUnreadEmails++;
      return storageService.put(INBOX_EMAILS_KEY, email)
    })
}

function _markAsRead(id){
    return getById(id)
    .then((email)=>{
      email.isRead = true;
      gUnreadEmails--;
      return storageService.put(INBOX_EMAILS_KEY, email)
    })
}

function getUnreadCount(){
  return gUnreadEmails
}


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