/* eslint-disable @next/next/no-img-element */
import React, { useState } from 'react';
import { PlusOutlined } from '@ant-design/icons';
import { Image, Upload } from 'antd';
import type { GetProp, UploadFile, UploadProps } from 'antd';
import { Images } from '~types/images';
import { useRemoveImages, useUploadImages } from '~hooks/images';

type FileType = Parameters<GetProp<UploadProps, 'beforeUpload'>>[0];

const getBase64 = (file: FileType): Promise<string> =>
    new Promise((resolve, reject) => {
        const reader = new FileReader();
        reader.readAsDataURL(file);
        reader.onload = () => resolve(reader.result as string);
        reader.onerror = (error) => reject(error);
    });

export const PicturesUpload = ({ images }: { images?: Images }) => {
    const { mutateAsync: postPicture } = useUploadImages();
    const { mutateAsync: removeImage } = useRemoveImages();
    const [previewOpen, setPreviewOpen] = useState(false);
    const [previewImage, setPreviewImage] = useState('');
    const [imagesList, setImagesList] = useState<UploadFile[]>(
        images ? images : [],
    );

    const handlePreview = async (file: UploadFile) => {
        if (!file.url && !file.preview) {
            file.preview = await getBase64(file.originFileObj as FileType);
        }

        setPreviewImage(file.url || (file.preview as string));
        setPreviewOpen(true);
    };

    const handleChange: UploadProps['onChange'] = ({ file, fileList }) => {
        if (imagesList.length < fileList.length) {
            if (file.originFileObj) {
                getBase64(file.originFileObj as FileType).then((url) =>
                    postPicture({
                        fileName: file.name,
                        fileType: file.type || 'image/png',
                        url,
                    }),
                );
            }
        }
        setImagesList([...fileList]);
    };

    return (
        <div>
            <Upload
                listType="picture-card"
                fileList={imagesList}
                onPreview={handlePreview}
                onChange={handleChange}
                onRemove={(file) => removeImage({ fileId: file.uid })}
            >
                <button style={{ border: 0, background: 'none' }} type="button">
                    <PlusOutlined />
                    <div style={{ marginTop: 8 }}>Upload</div>
                </button>
            </Upload>
            {previewImage && (
                <Image
                    wrapperStyle={{ display: 'none' }}
                    preview={{
                        visible: previewOpen,
                        onVisibleChange: (visible) => setPreviewOpen(visible),
                        afterOpenChange: (visible) =>
                            !visible && setPreviewImage(''),
                    }}
                    src={previewImage}
                    alt="image"
                />
            )}
        </div>
    );
};
