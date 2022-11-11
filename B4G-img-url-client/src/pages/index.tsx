import { InboxOutlined } from '@ant-design/icons';
import type { RcFile, UploadFile, UploadProps } from 'antd/es/upload/interface';
import { message, Upload, Button, Input } from 'antd';
import React, { ChangeEvent, Fragment, useState } from 'react';
import styles from './index.less';
const { Dragger } = Upload;

const genDragger: React.FC = () => {
  const [fileList, setFileList] = useState<UploadFile[]>([]);
  const [uploading, setUploading] = useState<boolean>(false);
  const [path, setPath] = useState<string>('');
  const [picsArr, setPicsArr] = useState<string[]>([]);
  const baseUrl =
    process.env.NODE_ENV === 'production'
      ? 'https://file.bytedance.cool/api'
      : 'http://localhost:3000';
  const uploadInfo: UploadProps = {
    onRemove: (file) => {
      const index = fileList.indexOf(file);
      const newFileList = fileList.slice();
      newFileList.splice(index, 1);
      setFileList(newFileList);
    },
    onDrop(e) {
      console.log('Dropped files', e.dataTransfer.files);
    },
    beforeUpload: (file) => {
      setFileList([...fileList, file]);
      return false;
    },
    fileList,
  };

  const uploadFile = async () => {
    if (path.length !== 0 && path[0] !== '/') {
      message.error('path must contain / at the beginning');
      return;
    }
    const formData = new FormData();
    fileList.forEach((file) => {
      // file.data = { path };
      formData.append('file', file as RcFile);
    });
    console.log(formData);
    setUploading(true);
    // You can use any AJAX library you like
    fetch(`${baseUrl}/upload`, {
      method: 'POST',
      body: formData,
      headers: {
        filepath: path,
      },
    })
      .then((res) => res.json())
      .then((res) => {
        setFileList([]);
        if (res) {
          message.success('upload successfully');
          console.log(res.link);
          setPicsArr(res.link);
        } else throw res;
      })
      .catch(() => {
        message.error('upload failed');
      })
      .finally(() => {
        setUploading(false);
      });
  };

  const handleUpload = (): void => {
    uploadFile();
  };
  const copy = (copyInfo: string) => {
    if (navigator.clipboard) {
      message.success('copy success');
      navigator.clipboard.writeText(copyInfo);
    } else {
      message.error('Version not supported, please manually copy to clipboard');
    }
  };
  return (
    <Fragment>
      <Dragger {...uploadInfo}>
        <p className="ant-upload-drag-icon">
          <InboxOutlined />
        </p>
        <p className="ant-upload-text">
          Click or drag file to this area to upload
        </p>
        <p className="ant-upload-hint">
          Support for a single or bulk upload. Strictly prohibit from uploading
          company data or other band files
        </p>
      </Dragger>
      <Input
        style={{ marginTop: 20 }}
        placeholder="/path"
        onChange={(e: ChangeEvent) =>
          setPath((e.target as HTMLInputElement).value)
        }
      />
      <Button
        type="primary"
        onClick={handleUpload}
        disabled={fileList.length === 0 || uploading}
        loading={uploading}
        className={styles.uploadBtn}
        style={{ margin: '20px auto', display: 'block' }}
      >
        {fileList.length ? (uploading ? 'loading' : 'upload') : 'pending'}
      </Button>
      {picsArr.map((item) => (
        <span className={styles.picUrl} onClick={() => copy(item)} key={item}>
          {item}
          <img
            src="https://file.bytedance.cool/img/06ea36857b80d7a82f6f2711ffc32f1a.png"
            className={styles.copyIcon}
          />
        </span>
      ))}
    </Fragment>
  );
};

export default genDragger;
