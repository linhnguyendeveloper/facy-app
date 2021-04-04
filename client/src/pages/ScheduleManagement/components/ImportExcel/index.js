import React, { useEffect, useMemo } from "react";
import { message, Popconfirm, Button } from "antd";
import { FileAddOutlined } from "@ant-design/icons";
import "./ImportExcel.scss";
import { importExcel } from "../../../../utils/importExcel";
import { importScheduleApi } from "../../../../services/api/attendances";
import { withRouter } from "react-router-dom";
import { useDropzone } from "react-dropzone";

const ImportExcel = ({
  history,
  setData,
  data,
  postMany,
  get,
  token,
  userRights,
  status,
  organizations,
}) => {
  const {
    acceptedFiles,
    getRootProps,
    getInputProps,
    isDragActive,
    isDragAccept,
    isDragReject,
  } = useDropzone();
  const files = acceptedFiles.map((file) => (
    <li key={file.path}>
      <strong>File :</strong> &nbsp; {file.path}
    </li>
  ));
  const baseStyle = {
    flex: 1,
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    padding: "20px",
    borderWidth: 2,
    borderRadius: 2,
    borderColor: "#eeeeee",
    borderStyle: "dashed",
    backgroundColor: "#fafafa",
    color: "#bdbdbd",
    outline: "none",
    transition: "border .24s ease-in-out",
    width: 400,
    margin: "0 auto",
    marginBottom: 10,
  };
  const activeStyle = {
    borderColor: "#2196f3",
  };

  const acceptStyle = {
    borderColor: "#00e676",
  };

  const rejectStyle = {
    borderColor: "#ff1744",
  };
  const style = useMemo(
    () => ({
      ...baseStyle,
      ...(isDragActive ? activeStyle : {}),
      ...(isDragAccept ? acceptStyle : {}),
      ...(isDragReject ? rejectStyle : {}),
    }),
    [isDragActive, isDragReject, isDragAccept],
  );
  const handleImportExcel = (info) => {
    importScheduleApi()
      .then((res) => {
        message.loading("Importing ... ", 1.5, () => {
          message.success("Schedule Imported !", 1, () => {
            history.push("/teachers");
          });
        });
      })
      .catch((err) => console.log(err));
  };

  useEffect(() => {
    const arr = {
      week1: [
        {
          class: "SE1301",
          date: 44273,
          index: 1,
          room: 201,
          slot: 1,
          week: 1,
        },
        {
          class: "SE1302",
          date: 44274,
          index: 2,
          room: 201,
          slot: 2,
          week: 1,
        },
        {
          class: "SE1303",
          date: 44275,
          index: 3,
          room: 201,
          slot: 3,
          week: 1,
        },
        {
          class: "SE1304",
          date: 44276,
          index: 4,
          room: 201,
          slot: 4,
          week: 1,
        },
      ],
      week2: [
        {
          class: "SE1305",
          date: 44277,
          index: 5,
          room: 201,
          slot: 5,
          week: 2,
        },
        {
          class: "SE1306",
          date: 44278,
          index: 6,
          room: 201,
          slot: 5,
          week: 2,
        },
        {
          class: "SE1307",
          date: 44279,
          index: 7,
          room: 201,
          slot: 2,
          week: 2,
        },
        {
          class: "SE1308",
          date: 44280,
          index: 8,
          room: 201,
          slot: 3,
          week: 2,
        },
      ],
      week3: [
        {
          class: "SE1309",
          date: 44281,
          index: 9,
          room: 201,
          slot: 4,
          week: 3,
        },
        {
          class: "SE1310",
          date: 44282,
          index: 10,
          room: 201,
          slot: 1,
          week: 3,
        },
        {
          class: "SE1311",
          date: 44283,
          index: 11,
          room: 201,
          slot: 2,
          week: 3,
        },
        {
          class: "SE1312",
          date: 44284,
          index: 12,
          room: 201,
          slot: 4,
          week: 3,
        },
      ],
      week4: [
        {
          class: "SE1313",
          date: 44285,
          index: 13,
          room: 201,
          slot: 6,
          week: 4,
        },
        {
          class: "SE1314",
          date: 44286,
          index: 14,
          room: 201,
          slot: 5,
          week: 4,
        },
        {
          class: "SE1315",
          date: 44287,
          index: 15,
          room: 201,
          slot: 6,
          week: 4,
        },
        {
          class: "SE1316",
          date: 44288,
          index: 16,
          room: 201,
          slot: 6,
          week: 4,
        },
      ],
    };
    const abc = Object.keys(arr).map((item) => {
      return arr[item].map((week) => {
        return {
          week: week.week,
          date: week.date,
          slot: week.slot,
          class: week.class,
          room: week.room,
        };
      });
    });
    const bcd = abc.map((item, index) => {
      return {
        week: item[0].week,
        data_in_week: item.map((row) => {
          return {
            date: row.date,
            data_in_date: [
              {
                slot: row.slot,
                class: row.class,
                room: row.room,
              },
            ],
          };
        }),
      };
    });
    if ((status && status?.ok) || status?.nOk || status?.nUpdate) {
      message.info(
        `Thêm thành công ${status?.ok} bản ghi, cập nhật thành công ${status?.nUpdate} bản ghi, thất bại ${status?.nOk} bản ghi!`,
      );
      // setTimeout(()=>{window.location.reload()},600)
    }
  }, [status]);

  return (
    <>
      <section className="container">
        <div {...getRootProps({ style })}>
          <input {...getInputProps()} />
          <p>Drag 'n' drop some files here, or click to select files</p>
        </div>
        <aside>
          <ul>{files}</ul>
        </aside>
      </section>
      <Popconfirm
        title="You sure you want to import file ?"
        onConfirm={handleImportExcel}
      >
        <Button style={{ marginBottom: 20 }} type="primary">
          Import Schedule <FileAddOutlined className="file-add-outlined" />
        </Button>
      </Popconfirm>
    </>
  );
};

export default withRouter(ImportExcel);
