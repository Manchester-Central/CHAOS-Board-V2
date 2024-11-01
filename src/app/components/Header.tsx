"use client";

import { useAppDispatch, useAppSelector } from "@/lib/redux/hooks";
import { addTab, addWidgetToTab, deleteTab, removeWidgetFromTab, updateCurrentTab, updateTabName } from "@/lib/redux/tabsSlice";
import { saveTabs } from "@/lib/sever-actions/tabs";
import { faCheckCircle, faMinus, faPencil, faPlus, faTrash, faWarning } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useEffect, useState } from "react";
import { Button, Form, Offcanvas } from "react-bootstrap";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";
import NavDropdown from "react-bootstrap/NavDropdown";

function Header() {
  const dispatch = useAppDispatch();
  const isConnected = useAppSelector((app) => app.nt.isConnected);
  const currentTabName = useAppSelector((app) => app.tabs.currentTabName);
  const currentTab = useAppSelector(app => app.tabs.allTabs[app.tabs.currentTabName]);
  const allTabs = useAppSelector((app) => app.tabs.allTabs);
  const tabState = useAppSelector((app) => app.tabs);
  const ntData = useAppSelector((app) => app.nt.data);
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

  const entryAddPressed = (entryKey: string) => {
    dispatch(addWidgetToTab({ tabName: currentTabName, entryKey }));
  };

  const entryRemovePressed = (entryKey: string) => {
    dispatch(removeWidgetFromTab({ tabName: currentTabName, entryKey }));
  };

  const isEntryAdded = (entryKey: string) => {
    return currentTab.widgets.some(w => w.key === entryKey);
  }

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
        <Nav.Link onClick={handleNtSelectOpen}>
          <FontAwesomeIcon icon={faPlus} /> Add Widget
        </Nav.Link>
        <Navbar.Text style={{marginLeft: 50}} className="justify-content-end">
          {isConnected ? <>Connected <FontAwesomeIcon icon={faCheckCircle} /> </> : <>Not connected <FontAwesomeIcon icon={faWarning} /></> }
        </Navbar.Text>
      </Navbar>

      <Offcanvas show={showNtSelect} onHide={handleNtSelectClose} placement={'end'} scroll={false} style={{width: 1000}}>
        <Offcanvas.Header closeButton>
          <Offcanvas.Title style={{display: "flex", justifyContent: "space-between"}}>
            <span style={{marginRight: 20}}>Entries</span> 
            <Form.Control id="entryFilter" placeholder="Filter entries"/></Offcanvas.Title> {/* TODO: make filter work*/}
        </Offcanvas.Header>
        <Offcanvas.Body>
          {Object.entries(ntData).map(([key, entry]) => // TODO: make tree view
            <div key={key} style={{margin: 5}}>
              {isEntryAdded(key) 
                ? <Button size="sm" variant={'danger'} onClick={() => entryRemovePressed(key)}><FontAwesomeIcon icon={faMinus}/></Button>
                : <Button size="sm" onClick={() => entryAddPressed(key)}><FontAwesomeIcon icon={faPlus}/></Button>
              } <strong>{key}:</strong> <span style={{maxWidth: 200, overflowX: 'clip'}}>{entry.value?.toString()}</span>
            </div>)}
        </Offcanvas.Body>
      </Offcanvas>
    </>
  );
}

export default Header;
