

import { storageService } from '../../../services/async-storage-service.js'
import { utilService } from '../../../services/util-service.js'
// import {eventBus} from './event-bus-service.js'



var isStartApp =true;
const INBOX_EMAILS_KEY = 'inbox_emails'
const gInboxEmails = [
                    {id:'XXXXX', subject: 'Whatsup?',  body: 'Hurry To Pick up!',      isRead: true, isStar:false, sentAt : 1551133930594,from:'Nati Golan',to:'Yoni Dalal',isInbox:true},
                    {id:'YYYYY', subject: 'Team meeting for the two teams', body: 'where are you? long time no seen. we have a team meeting for the two teams. you re invited. please dont be late. come to meeting room number2. it will be very teaching', isRead: false,  isStar:true,  sentAt : 1521133930594,from:'Shlomi Levi',to:'Ronit Band',isInbox:true},
                    {id:'ZZZZZ', subject: 'Hello from me',    body: 'long time',     isRead: true, isStar:false, sentAt : 1951133930594,from:'Elad Davidi',to:'Miri Cohen',isInbox:true},
                    {id:'AAAAA', subject: 'how r u?',  body: 'Hurry To Pick up!',      isRead: true, isStar:false, sentAt : 1551133930594,from:'Nati Golan',to:'Yehuda Dalal',isInbox:true},
                    {id:'BBBBB', subject: 'meeting', body: 'where are you? long time no seen. we have a team meeting for the two teams. you re invited. please dont be late. come to meeting room number2. it will be very teaching', isRead: false,  isStar:true,  sentAt : 1521133930594,from:'Shlomi Levi',to:'Ronit Band',isInbox:true},
                    {id:'CCCCC', subject: 'family party',    body: 'long time',     isRead: true, isStar:false, sentAt : 1951133930594,from:'Gad Davidi',to:'Miri Cohen',isInbox:true},
                    {id:'DDDDD', subject: 'coming for a visit',  body: 'hi. i will come tomorrow to meet u',      isRead: true, isStar:false, sentAt : 1551133930594,from:'Shimi Golan',to:'Yoni Dalal',isInbox:true},
                    {id:'EEEEE', subject: 'neighbours meeting', body: 'we are having a meeting for all neighbours. you are invited. please dont be late.', isRead: false,  isStar:true,  sentAt : 1521133930594,from:'Orli Levi',to:'Moti Band',isInbox:true},
                    {id:'FFFFF', subject: 'Hello from me',    body: 'long time',     isRead: true, isStar:false, sentAt : 1951133930594,from:'Elad Davidi',to:'Miri Cohen',isInbox:true},
                    {id:'GGGGG', subject: 'Wassap?',  body: 'Hurry To Pick up!',      isRead: true, isStar:false, sentAt : 1551133930594,from:'Nati Golan',to:'Yoni Dalal',isInbox:true},
                    {id:'HHHHH', subject: 'Team meeting for the two teams', body: 'where are you? long time no seen. we have a team meeting for the two teams. you re invited. please dont be late. come to meeting room number2. it will be very teaching', isRead: false,  isStar:true,  sentAt : 1521133930594,from:'Ido Levi',to:'Ronit Band',isInbox:true},
                    {id:'IIIII', subject: 'Hello from me',    body: 'long time',     isRead: true, isStar:false, sentAt : 1951133930594,from:'Elad Davidi',to:'Miri Cohen',isInbox:true},
                    {id:'JJJJJ', subject: 'remember?',  body: 'you have an appointment!',      isRead: true, isStar:false, sentAt : 1551133930594,from:'Nati Golan',to:'Yoni Dalal',isInbox:true},
                    {id:'KKKKK', subject: 'Team meeting for the two teams', body: 'where are you? long time no seen. we have a team meeting for the two teams. you re invited. please dont be late. come to meeting room number2. it will be very teaching', isRead: false,  isStar:true,  sentAt : 1521133930594,from:'Shlomi Dalal',to:'Ronit Ben',isInbox:true},
                    {id:'MMMMM', subject: 'Hello from yan',    body: 'i have a new job. wellcome to come visit',     isRead: true, isStar:false, sentAt : 1951133930594,from:'Yan Davidi',to:'Miri Aharoni',isInbox:true}




];


export const emailService = {
  query,
  remove,
  save,
  getEmptyEmail,
  getById,
  getNextEmailId,
  getPrevEmailId,
  updateStar,
  updateRead,
  updateReadFullMode,
}

function query() {
  return storageService.query(INBOX_EMAILS_KEY)
    .then(emails=> {
      if ((!emails||!emails.length)&&isStartApp){
        emails = gInboxEmails;
        utilService.saveToStorage(INBOX_EMAILS_KEY,gInboxEmails);
      }

      isStartApp=false;
    return emails;
    });
}

function remove(emailId) {
  return getById(emailId)
  .then((email)=>{
    return storageService.remove(INBOX_EMAILS_KEY, emailId);
  })
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
    return storageService.post(INBOX_EMAILS_KEY, email)//new
  }
}

function getEmptyEmail() { //for compose
  return {
            id:utilService.makeId(), 
            subject: 'subject', 
            body: 'Email body', 
            isRead: false, 
            isStar:false, 
            sentAt : 1551133930594,
            from:'Default Sender',
            to:'Default Reciever',
            isInbox:false
        }
}


function getById(id) {
  return storageService.get(INBOX_EMAILS_KEY, id)
}


function _markAsUnread(id){
    return getById(id)
    .then((email)=>{
      email.isRead = false;
      return storageService.put(INBOX_EMAILS_KEY, email)
    })
}

function _markAsRead(id){
    return getById(id)
    .then((email)=>{
      email.isRead = true;
      return storageService.put(INBOX_EMAILS_KEY, email)
    })
}

function updateReadFullMode(id){
  return getById(id)
  .then((email)=>{
    email.isRead = true;
    return storageService.put(INBOX_EMAILS_KEY, email);
  })
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