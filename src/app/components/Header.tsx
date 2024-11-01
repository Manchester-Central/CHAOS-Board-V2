"use client";

import { useAppDispatch, useAppSelector } from "@/lib/redux/hooks";
import { addTab, deleteTab, updateCurrentTab, updateTab, updateTabName } from "@/lib/redux/tabsSlice";
import { saveTabs } from "@/lib/sever-actions/tabs";
import { useEffect } from "react";
import Container from "react-bootstrap/Container";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";
import NavDropdown from "react-bootstrap/NavDropdown";

function Header() {
  const isConnected = useAppSelector((app) => app.nt.isConnected);
  const currentTab = useAppSelector((app) => app.tabs.currentTab);
  const allTabs = useAppSelector((app) => app.tabs.allTabs);
  const tabState = useAppSelector((app) => app.tabs);
  const dispatch = useAppDispatch();

  useEffect(() => {
    // Don't run if it's the initial tab state before loading the JSON.
    if (!tabState.currentTab) {
      return;
    }
    saveTabs(tabState);
  }, [tabState]);

  const updateSelectedTab = (tabName: string) => {
    dispatch(updateCurrentTab({ tabName }))
  }

  const newTabPressed = () => {
    // TODO: replace prompt and alert with better ux versions
    const tabName = prompt('New Tab Name?') ?? 'New Tab';
    if (allTabs[tabName]) {
      alert(`Tab '${tabName}' already exists`);
      return;
    }
    dispatch(addTab({ tabName }));
    dispatch(updateCurrentTab({ tabName }));
  }

  const updateTabNamePressed = () => {
    // TODO: replace prompt and alert with better ux versions
    const newTabName = prompt('New Tab Name?') ?? 'New Tab';
    if (allTabs[newTabName]) {
      alert(`Tab '${newTabName}' already exists`);
      return;
    }
    dispatch(updateTabName({ oldTabName: currentTab, newTabName }));
  }

  const deleteTabPressed = () => {
    // TODO: add confirmation
    dispatch(deleteTab({ tabName: currentTab }));
  }

  return (
    <Navbar
      fixed="top"
      expand="lg"
      style={{ backgroundColor: "var(--primary-color)", color: "white", zIndex: 999 }}
    >
      <Container>
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
          <NavDropdown title={currentTab} id="basic-nav-dropdown">
            <NavDropdown.Header>
              Select a tab
            </NavDropdown.Header>
            {Object.entries(allTabs).map(([tabName, value]) => (
              <NavDropdown.Item key={tabName} onClick={() => updateSelectedTab(tabName)}>
                {tabName}
              </NavDropdown.Item>
            ))}

            <NavDropdown.Divider />
            <NavDropdown.Item onClick={newTabPressed}>
              Create New Tab
            </NavDropdown.Item>
            <NavDropdown.Item onClick={updateTabNamePressed}>
              Update '{currentTab}' Tab Name
            </NavDropdown.Item>
            <NavDropdown.Divider />
            <NavDropdown.Header>
              Danger Zone
            </NavDropdown.Header>
            <NavDropdown.Item onClick={deleteTabPressed}>
              Delete '{currentTab}' Tab
            </NavDropdown.Item>
          </NavDropdown>
        </Nav>
        <Navbar.Text style={{marginLeft: 50}} className="justify-content-end">
          <small>Connected? {isConnected?.toString()}</small>
        </Navbar.Text>
      </Container>
    </Navbar>
  );
}

export default Header;
