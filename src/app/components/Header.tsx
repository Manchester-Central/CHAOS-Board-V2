"use client";

import { useAppDispatch, useAppSelector } from "@/lib/redux/hooks";
import { addTab, deleteTab, updateCurrentTab, updateTabName } from "@/lib/redux/tabsSlice";
import { saveTabs } from "@/lib/sever-actions/tabs";
import { faCancel, faCheckCircle, faPencil, faPlus, faTrash, faWarning } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useEffect, useState } from "react";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";
import NavDropdown from "react-bootstrap/NavDropdown";
import WidgetList from "./WidgetList";
import { setIsEditing } from "@/lib/redux/uiStateSlice";

function Header() {
  const dispatch = useAppDispatch();
  const isEditingLayout = useAppSelector((app) => app.ui.isEditingLayout);
  const isConnected = useAppSelector((app) => app.nt.isConnected);
  const currentTabName = useAppSelector((app) => app.tabs.currentTabName);
  const allTabs = useAppSelector((app) => app.tabs.allTabs);
  const tabState = useAppSelector((app) => app.tabs);
  const [showNtSelect, setShowNtSelect] = useState(false);

  const handleNtSelectClose = () => setShowNtSelect(false);
  const handleNtSelectOpen = () => setShowNtSelect(true);

  useEffect(() => {
    // Don't run if it's the initial tab state before loading the JSON.
    if (!tabState.currentTabName) {
      return;
    }
    saveTabs(tabState);
  }, [tabState]);

  const updateSelectedTab = (tabName: string) => {
    dispatch(updateCurrentTab({ tabName }))
  };

  const newTabPressed = () => {
    // TODO: replace prompt and alert with better ux versions
    const tabName = prompt('New Tab Name?') ?? 'New Tab';
    if (allTabs[tabName]) {
      alert(`Tab '${tabName}' already exists`);
      return;
    }
    dispatch(addTab({ tabName }));
    dispatch(updateCurrentTab({ tabName }));
  };

  const updateTabNamePressed = () => {
    // TODO: replace prompt and alert with better ux versions
    const newTabName = prompt('New Tab Name?') ?? 'New Tab';
    if (allTabs[newTabName]) {
      alert(`Tab '${newTabName}' already exists`);
      return;
    }
    dispatch(updateTabName({ oldTabName: currentTabName, newTabName }));
  };

  const deleteTabPressed = () => {
    // TODO: add confirmation
    dispatch(deleteTab({ tabName: currentTabName }));
  };

  return (
    <>
      <Navbar
        fixed="top"
        expand="lg"
        style={{ backgroundColor: "var(--primary-color)", color: "white", zIndex: 999, paddingLeft: 20, paddingRight: 20 }}
      >
        <Navbar.Brand>
          <img
            src="/ChaosLogo.png"
            height="30"
            className="d-inline-block align-top"
            alt="React Bootstrap logo"
          />
          <span style={{ marginLeft: 5 }}>Board</span>
        </Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Nav className="me-auto">
          <NavDropdown title={currentTabName} id="basic-nav-dropdown">
            <NavDropdown.Header>
              Select a tab
            </NavDropdown.Header>
            {Object.keys(allTabs).sort((a, b) => a.localeCompare(b)).map(tabName => (
              <NavDropdown.Item key={tabName} onClick={() => updateSelectedTab(tabName)}>
                {tabName}
              </NavDropdown.Item>
            ))}

            <NavDropdown.Divider />
            <NavDropdown.Item onClick={newTabPressed}>
              <FontAwesomeIcon icon={faPlus} /> Create New Tab
            </NavDropdown.Item>
            <NavDropdown.Item onClick={updateTabNamePressed}>
              <FontAwesomeIcon icon={faPencil} /> Update '{currentTabName}' Tab Name
            </NavDropdown.Item>
            <NavDropdown.Divider />
            <NavDropdown.Header>
              Danger Zone
            </NavDropdown.Header>
            <NavDropdown.Item onClick={deleteTabPressed} className="bg-danger text-white">
              <FontAwesomeIcon icon={faTrash} /> Delete '{currentTabName}' Tab
            </NavDropdown.Item>
          </NavDropdown>
        </Nav>
        <Nav.Link onClick={() => dispatch(setIsEditing(!isEditingLayout))}>
          {isEditingLayout 
            ? <><FontAwesomeIcon icon={faCancel} /> Stop Editing Mode </>
            : <><FontAwesomeIcon icon={faPencil} /> Enter Editing Mode </>
          }
        </Nav.Link>
        <Nav.Link style={{marginLeft: 50}} onClick={handleNtSelectOpen}>
          <FontAwesomeIcon icon={faPlus} /> Add Widget
        </Nav.Link>
        <Navbar.Text style={{marginLeft: 50}} className="justify-content-end">
          {isConnected ? <>Connected <FontAwesomeIcon icon={faCheckCircle} /> </> : <>Not connected <FontAwesomeIcon icon={faWarning} /></> }
        </Navbar.Text>
      </Navbar>

      <WidgetList isOpen={showNtSelect} onHide={handleNtSelectClose}/>
    </>
  );
}

export default Header;
