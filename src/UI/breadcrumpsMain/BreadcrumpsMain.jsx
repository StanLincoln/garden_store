import React from "react";
import s from "./BreadcrumpsMain.module.css";
import { Link } from "react-router-dom";

export default function Breadcrumbs({ breadcrumbs }) {
  return (
    <div className={s.btn_div}>
      {breadcrumbs.map((breadcrumb, index) => (
        <React.Fragment key={index}>
          <Link
            to={breadcrumb.path}
            className={`${s.btn_cads} ${breadcrumb.active ? s.activeButton : ""}`}
          >
            <span>{breadcrumb.label}</span>
          </Link>
          {index < breadcrumbs.length - 1 && <span className={s.breadcrumbLine}></span>}
        </React.Fragment>
      ))}
    </div>
  );
}