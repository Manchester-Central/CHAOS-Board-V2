"use client";

import { getEntryName, getEntryParentPath, NtEntry } from "@/lib/data/ntEntry";
import { useAppDispatch, useAppSelector } from "@/lib/redux/hooks";
import { addWidgetToTab, removeWidgetFromTab } from "@/lib/redux/tabsSlice";
import { faMinus, faPlus } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useState } from "react";
import { Button, Form, ListGroup, Offcanvas } from "react-bootstrap";

interface WidgetListProps {
  isOpen: boolean;
  onHide: () => void;
}
function WidgetList({isOpen, onHide}: WidgetListProps) {
  const dispatch = useAppDispatch();
  const currentTabName = useAppSelector((app) => app.tabs.currentTabName);
  const currentTab = useAppSelector(app => app.tabs.allTabs[app.tabs.currentTabName]);
  const ntData = useAppSelector((app) => app.nt.data);
  const [filterText, setFilterText] = useState('');

  const entryAddPressed = (entryKey: string) => {
    dispatch(addWidgetToTab({ tabName: currentTabName, entryKey }));
  };

  const entryRemovePressed = (entryKey: string) => {
    dispatch(removeWidgetFromTab({ tabName: currentTabName, entryKey }));
  };

  const isEntryAdded = (entryKey: string) => {
    return currentTab?.widgets.some(w => w.key === entryKey) ?? false;
  }

  const getEntryRow = (entry: NtEntry) => {
    const key = entry.key;
    const button = isEntryAdded(key) 
      ? <Button size="sm" variant={'danger'} onClick={() => entryRemovePressed(key)} style={{minWidth: 48}}><FontAwesomeIcon icon={faMinus}/></Button>
      : <Button size="sm" onClick={() => entryAddPressed(key)} style={{minWidth: 48}}><FontAwesomeIcon icon={faPlus}/></Button>;
    return <ListGroup.Item key={key}>
      <div style={{margin: 5, display: 'flex', flexDirection: 'row', minHeight: 48, gap: 10}}>
        {button} 
        <div style={{display: 'flex', flexDirection: 'column', minWidth: '50%'}}>
          <div className="text-muted"><small>{getEntryParentPath(entry)}</small></div>
          <div>{getEntryName(entry)}</div>
        </div>
        <div style={{flexGrow: 1, textWrap: 'nowrap', maxWidth: '50%', overflow: 'hidden', textOverflow: 'ellipsis'}}>
          {entry.value?.toString()}
        </div>
      </div>
    </ListGroup.Item>;
  }

  return (
    <Offcanvas show={isOpen} onHide={onHide} placement={'end'} scroll={false} style={{width: 1000}}>
      <Offcanvas.Header closeButton>
        <Offcanvas.Title style={{display: "flex", justifyContent: "space-between"}}>
          <span style={{marginRight: 20}}>Entries</span> 
          <Form.Control id="entryFilter" placeholder="Filter entries" onChange={e => setFilterText(e.target.value?.toLowerCase())} defaultValue={filterText}/></Offcanvas.Title> {/* TODO: make filter work*/}
      </Offcanvas.Header>
      <Offcanvas.Body>
        <ListGroup variant='flush'>
          {
            Object.values(ntData)
              .filter(entry => entry.key.toLowerCase().includes(filterText))
              .sort((a, b) => a.key.localeCompare(b.key))
              .map((entry) => getEntryRow(entry))
          }
        </ListGroup>
      </Offcanvas.Body>
    </Offcanvas>
  );
}

export default WidgetList;
