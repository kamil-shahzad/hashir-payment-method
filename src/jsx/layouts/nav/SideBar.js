/// Menu
//import MetisMenu from "metismenujs";
import React, { useContext, useEffect, useReducer, useState } from "react";
import { Button, Modal } from "react-bootstrap";
/// Scroll
import PerfectScrollbar from "react-perfect-scrollbar";
import Collapse from 'react-bootstrap/Collapse';
/// Link
import { Link } from "react-router-dom";


import {MenuList} from './Menu';
import {useScrollPosition} from "@n8tb1t/use-scroll-position";
import { ThemeContext } from "../../../context/ThemeContext";

const reducer = (previousState, updatedState) => ({
  ...previousState,
  ...updatedState,
});

const initialState = {
  active : "",
  activeSubmenu : "",
}

const SideBar = () => {
  const d = new Date();
	const {
		iconHover,
		sidebarposition,
		headerposition,
		sidebarLayout,
	} = useContext(ThemeContext);

  const [state, setState] = useReducer(reducer, initialState);	
  const [addEvent, setAddEvent] = useState(false);
  const [addHeart, setAddHeart] = useState(false);
  
	useEffect(() => {
				
			
	}, []);
 //For scroll
 	const [hideOnScroll, setHideOnScroll] = useState(true)
	useScrollPosition(
		({ prevPos, currPos }) => {
		  const isShow = currPos.y > prevPos.y
		  if (isShow !== hideOnScroll) setHideOnScroll(isShow)
		},
		[hideOnScroll]
	)
 
  const handleMenuActive = status => {		
    setState({active : status});		
		if(state.active === status){			
      setState({active : ""});
    }
   
	}
	const handleSubmenuActive = (status) => {		
    setState({activeSubmenu : status})
		if(state.activeSubmenu === status){
      setState({activeSubmenu : ""})
			
		}
    
	}
	
  /// Path
  let path = window.location.pathname;
  path = path.split("/");
  path = path[path.length - 1];

    return (
      <div className="deznav">
        <PerfectScrollbar className="deznav-scroll">
          <Link to={"#"}  className="add-menu-sidebar"
            onClick={()=>setAddEvent(true)}
          >
            + New Event
          </Link>
          <Modal className="modal fade" show={addEvent} onHide={setAddEvent} centered>
            <div className="modal-content">
              <div className="modal-header">
              <h5 className="modal-title">Add Event</h5>
              <Button variant="" type="button" className="close"
                onClick={()=>setAddEvent(false)}
              >
                <span>×</span>
              </Button>
              </div>
              <div className="modal-body">
                <form
                  className="comment-form"
                  
                >
                  <div>
                  <div className="form-group">
                    <label className="text-black font-w500">Event Name</label>
                    <input type="text" className="form-control" />
                  </div>
                  <div className="form-group">
                    <label className="text-black font-w500">Event Date</label>
                    <input type="date" className="form-control" />
                  </div>
                  <div className="form-group">
                    <label className="text-black font-w500">
                    Description
                    </label>
                    <input type="text" className="form-control" />
                  </div>
                  <div className="form-group">
                    <input
                    type="submit"
                    value="Create"
                    className="btn btn-primary"
                    />
                  </div>
                  </div>
                </form>
              </div>
            </div>
          </Modal>
          <ul className="metismenu" id="menu">
                {MenuList.map((data, index)=>{
                  let menuClass = data.classsChange;
                    if(menuClass === "menu-title"){
                      return(
                          <li className={menuClass}  key={index} >{data.title}</li>
                      )
                    }else{
                      return(				
                        <li className={` ${ state.active === data.title ? 'mm-active' : ''}`}
                          key={index} 
                        >
                          
                          {data.content && data.content.length > 0 ?
                            <>
                                <Link to={"#"} 
                                  className="has-arrow"
                                  onClick={() => {handleMenuActive(data.title)}}
                                >								
                                    {data.iconStyle}
                                    <span className="nav-text">{data.title}</span>
                                </Link>
                                  <Collapse in={state.active === data.title ? true :false}>
                                    <ul className={`${menuClass === "mm-collapse" ? "mm-show" : ""}`}>
                                      {data.content && data.content.map((data,index) => {									
                                        return(	
                                            <li key={index}
                                              className={`${ state.activeSubmenu === data.title ? "mm-active" : ""}`}                                    
                                            >
                                              {data.content && data.content.length > 0 ?
                                                  <>
                                                    <Link to={data.to} className={data.hasMenu ? 'has-arrow' : ''}
                                                      onClick={() => { handleSubmenuActive(data.title)}}
                                                    >
                                                      {data.title}
                                                    </Link>
                                                    <Collapse in={state.activeSubmenu === data.title ? true :false}>
                                                        <ul className={`${menuClass === "mm-collapse" ? "mm-show" : ""}`}>
                                                          {data.content && data.content.map((data,index) => {
                                                            return(	
                                                              <>
                                                                <li key={index}>
                                                                  <Link className={`${path === data.to ? "mm-active" : ""}`} to={data.to}>{data.title}</Link>
                                                                </li>
                                                              </>
                                                            )
                                                          })}
                                                        </ul>
                                                    </Collapse>
                                                  </>
                                                :
                                                <Link to={data.to}>
                                                  {data.title}
                                                </Link>
                                              }
                                              
                                            </li>
                                          
                                        )
                                      })}
                                    </ul>
                                  </Collapse>
                            </>
                              
                          :
                            <Link  to={data.to}>
                                {data.iconStyle}
                                <span className="nav-text">{data.title}</span>
                            </Link>
                          }
                         
                        </li>	
                      )
                  }
                })}          
          </ul>
          <div className="copyright">
            <p>
              <strong>HASHIR TECHNOLOGIES</strong> © {d.getFullYear()} All Rights
              Reserved
            </p>
            <p>
              Made with{" "}
              <span className={`heart ${addHeart ? "heart-blast" : ""}`}
                onClick={()=>setAddHeart(!addHeart)}
              ></span>{" "} by OvexSoftware
            </p>
          </div>
		    </PerfectScrollbar>
      </div>
    );
  
}

export default SideBar;
