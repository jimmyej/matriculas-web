import axios from "../../axiosInstance";

const getAllStudents = (showAll) => axios.get(`/v1/students?showAll=${showAll}`);

const createStudent = (student) => axios.post("/v1/students", student);

const updateStudent = (student) => axios.put("/v1/students/"+student.id, student);

const deleteStudent = (id) => axios.delete("/v1/students/"+id);

const uploadStudentPhoto = (student, file, isEditing) => {
    try {
        let form_data = new FormData();
        form_data.append('file', file, "testFileName");

        axios.post(buildUploadPath(student, isEditing), form_data, {
            headers: {
              'Content-Type': 'multipart/form-data'
            }
        });
    } catch (err) {
        console.log(err.response?.data || err);
    }
}

const buildUploadPath = (student, isEditing) => {
    const sufixPath = (isEditing && student.publicId !== null && student.publicId !== "") ? "/"+student.publicId : "";
    return  "/v1/students/"+student.id+"/upload"+ sufixPath
}

export default {
    getAllStudents,
    createStudent,
    updateStudent,
    deleteStudent,
    uploadStudentPhoto
}