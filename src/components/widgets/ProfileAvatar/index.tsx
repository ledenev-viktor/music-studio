import React, { useCallback, useState } from 'react';
import Cropper from 'react-easy-crop';
import { Area } from 'global';

const ProfileAvatar: React.FC = () => {
    const [image, setImage] = useState<string | null>(null);
    const [crop, setCrop] = useState({ x: 0, y: 0 });
    const [zoom, setZoom] = useState(1);
    const [croppedImg, setCorppedImg] = useState<string | null>(null);
    const [croppedAreaPixels, setCroppedAreaPixels] = useState<Area | null>(
        null,
    );

    console.log('image', image);

    const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        if (e.target.files && e.target.files.length > 0) {
            const reader = new FileReader();
            reader.readAsDataURL(e.target.files[0]);
            reader.onload = () => setImage(reader.result as string);
        }
    };

    const handleCrop = useCallback(async () => {
        if (!image || !croppedAreaPixels) return;

        try {
            const cropImg = await getCroppedImg(image, croppedAreaPixels);
            setCorppedImg(cropImg);
        } catch (error) {
            console.error('Ошибка при обрезке изображения:', error);
        }
    }, [image, croppedAreaPixels]);

    console.log('croppedImg', croppedImg);

    return (
        <div style={{ textAlign: 'center' }}>
            <input type="file" accept="image/*" onChange={handleFileChange} />
            {image && (
                <div
                    style={{
                        position: 'relative',
                        width: '300px',
                        height: '300px',
                        margin: '20px auto',
                        overflow: 'hidden', // Обрезка по кругу
                    }}
                >
                    <Cropper
                        image={image}
                        crop={crop}
                        zoom={zoom}
                        aspect={1}
                        onCropChange={setCrop}
                        onZoomChange={setZoom}
                        cropShape="round"
                        showGrid={false}
                        onCropComplete={(croppedArea, croppedAreaPixels) => {
                            setCroppedAreaPixels(croppedAreaPixels);
                        }}
                        style={{
                            containerStyle: {
                                position: 'absolute',
                                top: 0,
                                left: 0,
                                width: '100%',
                                height: '100%',
                            },
                            cropAreaStyle: {
                                borderRadius: '50%',
                                boxShadow: '0 0 0 9999px rgba(0, 0, 0, 0.6)',
                                border: '2px solid white',
                            },
                        }}
                    />
                </div>
            )}
            <input
                type="range"
                min="1"
                max="3"
                step="0.1"
                value={zoom}
                onChange={(e) => setZoom(Number(e.target.value))}
                style={{ marginTop: '20px' }}
            />
            <button onClick={handleCrop} style={{ display: 'block' }}>
                Обрезать
            </button>
            {croppedImg && <img src={croppedImg} alt="" />}
        </div>
    );
};

const getCroppedImg = async (imageSrc: string, crop: Area): Promise<string> => {
    return new Promise((resolve, reject) => {
        const image = new Image();
        image.src = imageSrc;
        image.crossOrigin = 'anonymous'; // Для CORS
        image.onload = () => {
            const canvas = document.createElement('canvas');
            const ctx = canvas.getContext('2d');

            if (!ctx) {
                reject(new Error('Failed to get canvas context'));
                return;
            }

            // Устанавливаем размеры canvas под размеры области обрезки
            canvas.width = crop.width;
            canvas.height = crop.height;

            // Вырезаем нужную часть изображения
            ctx.drawImage(
                image,
                crop.x, // Координаты обрезки
                crop.y,
                crop.width,
                crop.height,
                0,
                0,
                crop.width,
                crop.height,
            );

            // Преобразуем результат в URL Blob
            canvas.toBlob((blob) => {
                if (!blob) {
                    reject(new Error('Canvas is empty'));
                    return;
                }
                resolve(URL.createObjectURL(blob));
            }, 'image/jpeg');
        };

        image.onerror = () => {
            reject(new Error('Failed to load image'));
        };
    });
};

export default ProfileAvatar;
