import axios from 'axios';
import { useEffect, useState } from 'react';
import style from './App.module.css';

// custom form 
const AppForm = ({ imageId, ...props }) => {

  const submit = (event) => { // logic for submit form
    event.preventDefault();
    const login = event.target[0]; 
    const text = event.target[1];

    if (!(Boolean(login.value && text.value)) || (login.value < 0) || (text.value < 0)) {  // error validation
      props.setModalWindowData('UNSUCCESS');
    } else {
      // if the form is correct then there is a post request
      axios.post(`https://boiling-refuge-66454.herokuapp.com/images/${imageId}/comments`, {
        comment: 'text.value',
        name: 'login.value'
      }).then(Response => {
        if (Response.status === 204) {
          // 204 - OK
          props.leaveComment(login.value, text.value);
        }
      })
      props.setModalWindowData('SUCCESS');
    }
  }


  const onBlurChange = (ref, type) => { // custom onBlur for 
    if (ref.target.value.length < 1) {
      ref.target.placeholder = 'FIELD IS REQUIRED'; 
    } else {
      ref.target.placeholder = `${type[0].toUpperCase() + type.slice(1).toLowerCase()}`;
    }
  }

  return <form className={style.ModalWindowContentLeftBlockForm} onSubmit={(event) => { submit(event) }}> {/* custom form */}
    <input type='text' className={style.ModalWindowContentLeftBlockFormInput} placeholder = 'Name ' onBlur = { (e) => { onBlurChange(e, 'NAME') } } />
    <input type='text' className={style.ModalWindowContentLeftBlockFormInput}  placeholder = 'Text' onBlur = { (e) => { onBlurChange(e, 'TEXT') } }/>

    <button className={style.ModalWindowContentLeftBlockFormInputButton}>LEAVE POST</button>
  </form>
}

const ModalWindow = ({ boolean, imageId, closeWindow, ...props }) => {

  const [modalWindowData, setModalWindowData] = useState({
    imageId: null,
    imageUrl: null,
    comments: [],
    succes: false,
    type: '' // type - for succesFlow
  })
  // hooks 

  const SuccessFlowUnsucces = ({ type, ...props }) => { // custom function for success and unsuccess operation
    return <div className={style.UnsuccesSuccesBlock}>
      {type == 'SUCCESS' ?
        // check mark
        <svg viewBox="64 64 896 896" focusable="false" data-icon="check-circle" width="1em" height="1em" fill="currentColor" aria-hidden="true" className={style.SuccesSvg}>
          <path d="M699 353h-46.9c-10.2 0-19.9 4.9-25.9 13.3L469 584.3l-71.2-98.8c-6-8.3-15.6-13.3-25.9-13.3H325c-6.5 0-10.3 7.4-6.5 12.7l124.6 172.8a31.8 31.8 0 0051.7 0l210.6-292c3.9-5.3.1-12.7-6.4-12.7z"></path>
          <path d="M512 64C264.6 64 64 264.6 64 512s200.6 448 448 448 448-200.6 448-448S759.4 64 512 64zm0 820c-205.4 0-372-166.6-372-372s166.6-372 372-372 372 166.6 372 372-166.6 372-372 372z"></path>
        </svg>
        :
        // cross
        <svg viewBox="64 64 896 896" focusable="false" data-icon="close-circle" width="1em" height="1em" fill="currentColor" aria-hidden="true" className={style.UnsuccesSvg}>
          <path d="M685.4 354.8c0-4.4-3.6-8-8-8l-66 .3L512 465.6l-99.3-118.4-66.1-.3c-4.4 0-8 3.5-8 8 0 1.9.7 3.7 1.9 5.2l130.1 155L340.5 670a8.32 8.32 0 00-1.9 5.2c0 4.4 3.6 8 8 8l66.1-.3L512 564.4l99.3 118.4 66 .3c4.4 0 8-3.5 8-8 0-1.9-.7-3.7-1.9-5.2L553.5 515l130.1-155c1.2-1.4 1.8-3.3 1.8-5.2z"></path>
          <path d="M512 65C264.6 65 64 265.6 64 513s200.6 448 448 448 448-200.6 448-448S759.4 65 512 65zm0 820c-205.4 0-372-166.6-372-372s166.6-372 372-372 372 166.6 372 372-166.6 372-372 372z"></path>
        </svg>}

      <p className={style.SuccesUnsuccesBlockText}>{type == 'SUCCESS' ? 'Success' : 'Check lorin or text'}</p>
    </div>
  }

  useEffect(() => {
    axios.get(`https://boiling-refuge-66454.herokuapp.com/images/${imageId}`).then(Response => { // get modal window for current id
      setModalWindowData(prev => ({
        ...prev,
        imageId: Response.data.id,
        imageUrl: Response.data.url,
        comments: Response.data.comments
      }))
    })
  }, [])

  const leaveComment = (login, text) => { // logic for leave comment

    const getNowDate = () => { // get a exact time for timestamp 
      const today = new Date();
      const day = String(today.getDate()).padStart(2, '0');
      const month = String(today.getMonth() + 1).padStart(2, '0'); // January is 0
      const year = today.getFullYear();
      return `${month}.${day}.${year}`;
    }

    const templateComment = { // template for the comment
      date: getNowDate(),
      id: modalWindowData.comments.length,
      text: text
    }

    setModalWindowData(prev => ({ // set a comment
      ...prev,
      comments: [...prev.comments, templateComment]
    }))
  }


  return <div className={style.ModalWindow}> {/* main render for modal window */}
    <div className={style.ModalWindowClose} onClick={() => { closeWindow() }}></div>

    {modalWindowData.succes && <SuccessFlowUnsucces type={modalWindowData.type} />}

    <div className={style.ModalWindowContent}>
      {/* cross to close a modal window */}
      <svg width="20" height="19" viewBox="0 0 20 19" fill="none" className={style.CloseWindowIcon} onClick = { () => { closeWindow() } }>
        <line x1="1.35355" y1="0.646447" x2="19.3536" y2="18.6464" stroke="black" />
        <line x1="0.646447" y1="18.6464" x2="18.6464" y2="0.646446" stroke="black" />
      </svg>


      <div className={style.ModalWindowContentLeftBlock}>
        <img src={modalWindowData.imageUrl} />

        <div>
          <AppForm imageId={modalWindowData.imageId} leaveComment={(id, login) => { leaveComment(id, login) }} setModalWindowData={(type) => { setModalWindowData(prev => ({ ...prev, succes: true, type, })) }} />
        </div>
      </div>

      <div className={style.ModalWindowContentRightBlock}>
        <div className={style.ModalWindowContentRightBlockWrapper}>
          {modalWindowData.comments.length ? modalWindowData.comments.map((a) => { // if there are comments then post them

            const timestampToDate = (ts) => { // get the current time
              let date = new Date();
              date.setTime(ts);
              return ('0' + date.getDate()).slice(-2) + '.' + ('0' + (date.getMonth() + 1)).slice(-2) + '.' + date.getFullYear();
            }

            return <div className={style.ModalWindowContentRightBlockItem} key={a.id}>
              <span className={style.ModalWindowContentRightBlockItem_date}> {!String(a.date).split('').includes('.') ? timestampToDate(a.date) : a.date} </span>
              <p className={style.ModalWindowContentRightBlockItem_text}>{a.text}</p>
            </div>
          }) : 'Комментариев нет'}
        </div>
      </div>
    </div>
  </div>
}


function App() { // main function
  const [photos, setPhotos] = useState([]);  //get photo
  const [modalWindow, setModalWindow] = useState({ boolean: false, imageId: null });
  // hooks


  // get photos
  useEffect(() => {
    axios.get(`https://boiling-refuge-66454.herokuapp.com/images`).then(Response => {
      setPhotos(Response.data);
    })
  }, [])

  // logic for change state && close open window && using as callback
  const OpenCloseFlow = (boolean, imageId) => {
    setModalWindow((prev) => ({
      ...prev,
      boolean: boolean,
      imageId: imageId
    }))
  }

  // main render for app
  return (
    <div className={style.App}>
      <header className={style.Header}>
        TEST APP
      </header>
      <main className = {style.Main}>
        {modalWindow.boolean && <ModalWindow {...modalWindow} closeWindow={() => { OpenCloseFlow(false) }} />}

        {photos.map((a) => {
          return <div key={a.id}>
            <img src={a.url} onClick={() => { OpenCloseFlow(true, a.id) }} />
          </div>
        })}
      </main>
      <footer className = {style.Footer}>© 2018-2019</footer>
    </div>
  );
}

export default App;
