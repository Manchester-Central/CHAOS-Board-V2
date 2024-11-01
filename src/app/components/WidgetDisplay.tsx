"use client";

import { getEntryName, getEntryParentPath } from "@/lib/data/ntEntry";
import { Widget } from "@/lib/data/widget";
import { useAppDispatch, useAppSelector } from "@/lib/redux/hooks";
import { Card, CardBody, CardHeader } from "react-bootstrap";

interface WidgetDisplayProps {
  widget: Widget;
}
function WidgetDisplay({widget}: WidgetDisplayProps) {
  const dispatch = useAppDispatch();
  const entry = useAppSelector((app) => app.nt.data[widget.key]);

  return (
      <Card style={{overflow: 'auto', minHeight: '100%', maxHeight: '100%'}}>
        <CardHeader>
            <div style={{flexGrow: 2, textWrap: 'nowrap', maxWidth: '100%', overflow: 'hidden', textOverflow: 'ellipsis'}}>{getEntryName(widget.key)} <small>{getEntryParentPath(widget.key)}</small></div>
        </CardHeader>
        <CardBody>
          {entry?.value?.toString()}
        </CardBody>
      </Card>
  );
}

export default WidgetDisplay;
