import React, { useState } from 'react';
import { Input, Button, Panel } from 'rsuite';
import DataSender from './DataSender';
import { useParams, useNavigate } from 'react-router-dom';

const CreateNewStaff = () => {
    const { providerId } = useParams();
    const [uid, setUid] = useState('');
    const [name, setName] = useState('');
    const [specialty, setSpecialty] = useState('');
    const [background, setBackground] = useState('');
    const [startWorkTime, setStartWorkTime] = useState('');
    const [getOffWorkTime, setGetOffWorkTime] = useState('');
    const [profilePicture, setProfilePicture] = useState("");
    const [service, setService] = useState(3);
    const dataSender = new DataSender();
    const navigate = useNavigate();


    const addStaffInfo = () => {
        const shouldAddStaff = window.confirm('Are you sure you want to add this staff member?');

        if (shouldAddStaff) {
            const NewStaffData = {
                uid: uid,
                name: name,
                specialty: specialty,
                background: background,
                start_work_time: startWorkTime,
                get_off_work_time: getOffWorkTime,
                profile_picture: profilePicture,
                service_provider: providerId,
                service: service,
            };

            dataSender.submitStaffData(NewStaffData).then(() => {
                console.log('Staff information added.');
                navigate('/provider-management');
            });
        }
    };

    const uploadImage = async (event) => {
        const file = event.target.files[0];
        if (file) {
            try {
                const base64Image = await dataSender.convertImageToBase64(file);
                setProfilePicture(base64Image);
            } catch (error) {
                console.error("Error converting image to base64:", error);
            }
        }
    };

    return (
        <div>
            <Panel header={<h3>Add new staff</h3>}>
                <div>
                    <h5>Profile Picture: </h5>
                    <img src={profilePicture} alt="No profile picture" />
                    <input
                        type="file"
                        accept="image/*"
                        onChange={uploadImage}
                    />
                </div>
                <div>
                    <h5>UID: </h5>
                    <Input
                        placeholder="Uid"
                        value={uid}
                        onChange={(value) => setUid(value)}
                    />
                </div>
                <div>
                    <h5>Name: </h5>
                    <Input
                        placeholder="Name"
                        value={name}
                        onChange={(value) => setName(value)}
                    />
                </div>
                <div>
                    <h5>Specialty: </h5>
                    <Input
                        placeholder="Specialty"
                        value={specialty}
                        onChange={(value) => setSpecialty(value)}
                    />
                </div>
                <div>
                    <h5>Background: </h5>
                    <Input
                        placeholder="Background"
                        value={background}
                        onChange={(value) => setBackground(value)}
                    />
                </div>
                <div>
                    <h5>Start work time: </h5>
                    <Input
                        placeholder="Start work time"
                        value={startWorkTime}
                        onChange={(value) => setStartWorkTime(value)}
                    />
                </div>
                <div>
                    <h5>Get off work time: </h5>
                    <Input
                        placeholder="Get off work time"
                        value={getOffWorkTime}
                        onChange={(value) => setGetOffWorkTime(value)}
                    />
                </div>
                <Button appearance="primary" onClick={addStaffInfo}>
                    Add new staff
                </Button>
            </Panel>
        </div>
    );
};

export default CreateNewStaff;

