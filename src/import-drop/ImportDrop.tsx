import { FileUploader } from "react-drag-drop-files";
import "./import-drop.scss";

const fileTypes = ["CSV"];

export const ImportDrop: React.FC<{
    onChange: (file: File) => void;
}> = ({ onChange }) => {
    const handleChange = (file: File) => {
        onChange(file);
    };

    return (
        <div>
            <h3>Please drop a csv with headers</h3>

            <FileUploader handleChange={handleChange} name="file" types={fileTypes} classes="uploader" />
        </div>
    );
};
