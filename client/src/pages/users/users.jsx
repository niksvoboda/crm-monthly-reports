import React, { useState ,useEffect, useContext} from 'react';
import { fetchEntrys  , fetchEntry , addEntry, updateEntry, deleteEntry} from "../../http/api_users";
import Pagenumbers from '../../components/UI/pagenumbers';
import { Pagination } from '../../components/UI/pagination';
import { Select } from "../../components/UI/select";
//import date_format  from "dateformat";
import Searchinput from '../../components/UI/searchinput';
import { Modal } from './modal';
import { ModalDelete } from './modal_delete';
import { useSnackbar } from 'react-simple-snackbar'
import { option_green_snackbar, option_red_snackbar } from '../../components/UI/Snackbar';
import { UserContext } from '../../contex';

const Users = () => {
/** Ролевая модель */
const {user} = useContext(UserContext)
/** Всплывающее сообщение */
const [openGreen, closeGreen] = useSnackbar(option_green_snackbar)
const [openRed, closeRed] = useSnackbar(option_red_snackbar)

const mask = "yyyy.mm.dd HH:MM:ss";
const [content, setContent] = useState([{}]);
/** Для компонента поиска */
const[search, setSearch] = useState("")
const[group_search, set_group_search] = useState("")
/** Показывать ли удаленные */
const[deprecate, set_deprecate] = useState(1)
//Количество записей на странице
const [length, setLength] = useState(10);
const [start, setStart] = useState(0);
//Пагинация
const [totalPage, setTotalPage] = useState(0);
const [totalCount, setTotalCount] = useState(0);
const [page, setPage] = useState(1);

//Получение контента и общего количества записей из бд
const getContent = async () => {
   try{
      const result  = await fetchEntrys(start, length, search)
      return result } catch (e) { console.log(e.response.data.message)} 
 }
 /** Получаем единичную запись */
 const  get_Entry = async (entry_id) => {
   try{
        const result  = await fetchEntry(entry_id)
        return result
   } catch (e) {
        console.log(e.response.data.message)
        return e
   }
}
/**Сохраняем единичную запись */
const  add_Entry = async (data) => {
   try{            
      const result = await addEntry(data)
      return result
   } catch (e) {
        console.log(e.response.data.message)
        return e
   }
}
const  update_Entry = async (data, entry_id) => {
   try{            
      const result = await updateEntry(data, entry_id)
      return result
   } catch (e) {
        console.log(e.response.data.message)
        return e
   }
}
const  delete_Entry = async (entry_id) =>{
   try{
      const result  = await deleteEntry(entry_id)
      return result
  } catch (e) {
       console.log(e.response.data.message)
       return e
  }
}

/** Обновляем содержимое при изменении параметров выборки */ 
const [refreshContent, set_refreshContent] = useState(false)

useEffect(()=>{
   getContent()
   .then((content) => {
      console.log(content)
      setContent(content?.data)
      setTotalCount(content?.total_entrys)
      
   })
    .catch((err) => {
      console.error(err);
   })
},[length, start, search, refreshContent, deprecate])

//Отслеживаем количество страниц
useEffect(()=>{
    setTotalPage(Math.floor(totalCount/length + 0.999)  )
},[totalCount , length])
//Отслеживаем начальную запись выборки для вывода на страницу
useEffect(()=>{
    if (totalCount > length ) {
        setStart((page - 1) * length)
        //console.log(page)  
    } else {
        setStart(0)
    }
},[page, length])

useEffect(()=>{
   //сбрасываем номер страницы чтобы не баговалось при переключении количества записей на странице
    setPage(1);
},[length])

   /** Обслуживаем модальные окна */
   
   const [hideModal, set_hideModal] = useState(false)
   const [entry_id, set_entry_id] = useState(null)
   const [hideDeleteModal, set_hideDeleteModal] = useState(false)
   const [entry, set_entry] = useState(null)
   /** Открываем окно с пустой записью */
   const open_create_Entry = () =>{
      get_Entry(0)
      .then((content) => {
         console.log(content)
         set_entry(content);
         set_hideModal(true);
      })
       .catch((err) => {
         console.error(err);
      })  
   }
   /** Открываем модальное окно с данными записи, при клике на кнопку подгружаем запись по ID чтобы потом передать ее пропсом*/
   const open_update_Entry = (entry_id) =>{
      get_Entry(entry_id)
      .then((content) => {
         console.log(content)
         set_entry(content);
         set_hideModal(true);
         set_entry_id(entry_id);
      })
       .catch((err) => {
         console.error(err);
      })  
   }
 
   /** Отправка на создание/редактирование  записи - передаем пропсом в модальное окно */
   const  confirm_save_Entry = (data, entry_id) =>{
      if (entry_id) {
         update_Entry (data, entry_id)
         .then((result) => {
           if (result?.status === "OK") {
            openGreen(result?.message)
             /** Если запрос успешен закрываем форму и обнуляем ENTRY_ID */
             exit()
             } else {
            openRed(result?.message)
             }
            console.log(result)
          })
          .catch((err) => {console.error(err);}) 
      } else{
         add_Entry (data)
         .then((result) => {
           if (result?.status === "OK") {
            openGreen(result?.message)
             /** Если запрос успешен закрываем форму и обнуляем ENTRY_ID */
             exit()
             } else {
            openRed(result?.message)
             }
            console.log(result)
          })
          .catch((err) => {console.error(err);}) 
      }
   }
   /** Открываем окно с запросом на подверждение удаления
    * вызываем по клику на кнопку удалить назначаем entry_id 
    * чтобы он пропсом передался в модальное окно вместе с функцией удаления*/
   const open_delete_Entry = (entry_id) =>{
      set_entry_id(entry_id);
      set_hideDeleteModal(true);
   }
   /** Подверждение удаления - функцию передаем пропсом в модальное окно подверждения*/
   const  confirm_delete_Entry = (entry_id) =>{
      delete_Entry(entry_id)
      .then((result) => {
         if (result?.status === "OK") {
            openGreen(result?.message)
             /** Если запрос успешен закрываем форму и обнуляем ENTRY_ID */
             set_hideModal(false);
             set_entry_id(null);
             exit()
             } else {
            openRed(result?.message)
             }
         /**Если успешно скрываем окно и обнуляем ID*/
  
      })
       .catch((err) => {
         console.error(err);
      }) 
   }
   /** Передаем пропсами для закрытия модального окна */
   const exit = () =>{
      /**Притормаживаем чтобы usEffect для обновления контента сработал после удаления записи из БД и показал актуальную страницу */
      setTimeout(()=>{
         set_refreshContent(!refreshContent)
      }, 300)
      /**Закрываем окна и очищаем данные*/
      set_hideModal(false);
      set_hideDeleteModal(false);
      set_entry(null);
      set_entry_id(null);
   }

   //const [search, setSearch] = useState('')

    return (
<div className="container-fluid py-4 vh-height-75">
  <div class="row">
   <div class="col-12">
      <div class="card">
            <div className="card-header p-0 position-relative mt-n4 mx-3 z-index-2">
                <div className="bg-gradient-primary shadow-primary border-radius-lg pt-4 pb-3">
                  <h6 className="text-white text-capitalize ps-3">Пользователи</h6>
                </div>
              </div>
         <div class="table-responsive">
            <div class="dataTable-wrapper dataTable-loading no-footer sortable searchable fixed-columns">
               <div class="dataTable-top">
                  <div class="dataTable-dropdown">
                     <label>
                     <Select 
                        value={length}
                        onChange={selectedSort =>setLength(selectedSort)}
                        options={[
                       // {type: 5, name: '5'},
                        {type: 1, name: '10'},
                        {type: 25, name: '25'},
                        {type: 50, name: '50'},
                        {type: 100, name: '100'}
                        ]}                            
                        //defaultValue='кол-во'
                        />                         
                      </label>&nbsp;
                     <Searchinput
                     setSearch={setSearch}
                     />
                  </div>
                  <div class="dataTable-search"></div>
               </div>
               <div class="dataTable-container">
                  <table class="table table-flush dataTable-table" id="datatable-search">
                     <thead class="thead-light">
                        <tr>
                        <th className="text-center text-uppercase text-xxs font-weight-bolder opacity-7" width="20px">ID</th>
                        <th className="text-center text-uppercase text-xxs font-weight-bolder opacity-7">Имя</th>
                        <th className="text-center text-uppercase text-xxs font-weight-bolder opacity-7 ps-2">Должность</th>
                        <th className="text-center text-uppercase text-xxs font-weight-bolder opacity-7 ps-2">Логин</th>
                        <th className="text-center text-uppercase text-xxs font-weight-bolder opacity-7">Email</th>
                        <th className="text-center text-uppercase text-xxs font-weight-bolder opacity-7"> Создано</th>
                        </tr>
                     </thead>
                     <tbody>
                     {content?.map(entry=><tr key={content.indexOf(entry)}>
                          <td>
                            <div class="d-flex align-items-center">
                              <p class="text-xs font-weight-normal ms-2 mb-0">{entry.user_id}</p>
                            </div>
                           </td>
                           <td class="font-weight-normal">
                              <div className="d-flex px-2 py-1">
                              <div>
                                 <img src="../../../assets/img/team-3.jpg" className="avatar avatar-sm me-3" alt="avatar image"/>
                              </div>
                              <div className="d-flex flex-column justify-content-center">
                                 <h6 className="mb-0 font-weight-normal text-sm">{entry.username}</h6>
                              </div>
                           </div>
                           </td>
                           <td class="text-xs font-weight-normal">
                              <div class="d-flex align-items-center">
                                 <button class="btn btn-icon-only btn-rounded btn-outline-success mb-0 me-2 btn-sm d-flex align-items-center justify-content-center"><i class="material-icons text-sm" aria-hidden="true">done</i></button>
                                 <span>{entry.position}</span>
                              </div>
                           </td>
                           <td class="text-xs font-weight-normal">
                              <div class="d-flex align-items-center">
                                 <div class="avatar avatar-xs me-2 bg-gradient-info">
                                    <span>O</span>
                                 </div>
                                 <span>{entry.login}</span>
                              </div>
                           </td>
                           <td class="text-xs font-weight-normal">
                              <span class="my-2 text-xs">
                              {entry.email}
                              </span>
                           </td>
                           <td class="text-xs font-weight-normal">
                              <span class="my-2 text-xs">{entry.created_dt}</span>
                           </td>
                        </tr>)}
                     </tbody>
                  </table>
               </div>
               <div class="dataTable-bottom">
                  <div class="dataTable-info">
                    <Pagenumbers
                     start={start}
                     length ={length}
                     totalCount={totalCount}
                     />
                  </div>
                  <nav class="dataTable-pagination">
                  <Pagination
                totalPage={totalPage}
                onClick={selectedPage =>setPage(selectedPage)}
                />
                  </nav>
                </div>
            </div>
         </div>
      </div>
   </div>
</div>
</div>
    );
};

export default Users;