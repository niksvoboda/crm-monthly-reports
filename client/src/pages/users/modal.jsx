import React, { useContext} from 'react';
import { useForm } from "react-hook-form"
import { UserContext } from '../../contex';

export const Modal = ({entry, confirm_save_Entry , exit}) => {
   /** Ролевая модель */
const {user} = useContext(UserContext)
      //  console.log(entry?.places)
        console.log(entry)
         /**Кнопка esc */
         document.addEventListener('keydown', function(e) {if( e.key === 'Escape' ){ exit(); }});
       
         /** Создаем форму если запись указана то подставляем данные   */    
            const {register, handleSubmit, formState:{errors}, setValue
            } = useForm({
            defaultValues:{
               title: entry?.data && entry.data.title,
               field1: entry?.data && entry.data.field1,
               usertitle: entry?.data?.usertitle && entry.data.usertitle,
            },
                mode: 'onChange'
            });
            
            const onSubmit = (data) =>{
            console.log(data ,  entry?.data?.command_id )
            confirm_save_Entry(data,  entry?.data?.command_id?  entry?.data?.command_id : null)
           }

return (
<form className="modal formDivision show background_modals" 
                onSubmit={handleSubmit(onSubmit)} 
                style={{display: 'block', paddingLeft: '0px'}} 
                onClick={e=>exit()}
                >
                <div className="modal-dialog modal-dialog-centered modal-xs">

                <div className="modal-content" onClick={event=>event.stopPropagation()}>
   <div className="modal-header">
      <h5 className="modal-title">{entry?.data?.command_id? "Редактирование " : "Добавление "} типа команды</h5>
      <button type="button" className="btn-close"  onClick={e=>exit()}></button>
   </div>
   <div className="modal-body">

    <div className="row">
         <div className="col-sm-12">
            <div className="form-floating mb-3">
            <input type="text" className="form-control" 
                   maxLength="50"
                   {...register('usertitle', {
                       required:'Укажите пользовательское название команды',
                       maxLength: 50
                   })}/>
               <label htmlFor="net_group_name">
               {errors?.usertitle?.message?
                 <span className='errors-input'> {errors?.usertitle?.message} </span>
                 : "Пользовательское название команды: " 
                 }</label>
            </div>
         </div>
      </div>
      
      <div className="row">
         <div className="col-sm-12">
            <div className="form-floating mb-3">
            <input type="text" className="form-control" 
                   maxLength="50"
                   {...register('title', {
                       required:'Укажите тип команды',
                       maxLength: 50
                   })}/>
               <label htmlFor="net_group_name">
               {errors?.title?.message?
                 <span className='errors-input'> {errors?.title?.message} </span>
                 : "Тип команды: " 
                 }</label>
            </div>
         </div>
      </div>
      <div className="row">
         <div className="col-sm-12">
            <div className="form-floating mb-3">
            <input type="text" className="form-control" 
                   maxLength="50"
                   {...register('field1', {
                       required:'Укажите описание команды',
                       maxLength: 200
                   })}/>
               <label htmlFor="net_group_name">
               {errors?.field1?.message?
                 <span className='errors-input'> {errors?.tifield1tle?.message} </span>
                 : "Описание команды: " 
                 }</label>
            </div>
         </div>
      </div>
   </div>
   <div className="modal-footer d-flex justify-content-between">
      <div>
         <button type="button" className="btn btn-sm btn-secondary" onClick={e=>exit()} >Отмена</button> &nbsp;
         {user?.permissions?.settings_commands_edit &&
         <button type="submit" className="btn btn-sm btn-primary">Сохранить</button>}
      </div>
   </div>
</div>
            </div>
          </form>
        );
    }

