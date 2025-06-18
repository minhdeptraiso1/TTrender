import React, { useEffect } from 'react'
import { useForm } from 'react-hook-form';
import { useAuth } from '../../hooks/useAuth';
import classes from './profilePage.module.css';
import Title from '../../components/Title/Title';
import Input from '../../components/Input/Input';
import Button from '../../components/Button/Button';
import Loading from '../../components/Loading/Loading'; // Add if you have one

export default function ProfilePage() {
    const { user, updateProfile } = useAuth();
    
    // Initialize form without default values first
    const { register, handleSubmit, reset, formState: { errors, isSubmitting } } = useForm();
    
    useEffect(() => {
        if (user) {
            reset({
                name: user.name || "",
                address: user.address || ""
            });
        }
    }, [user, reset]);

    const onSubmit = data => {
        updateProfile(data);
    };

    if (!user) return <Loading />; // Or some other loading/empty state

    return (
        <div className={classes.container}>
            <div className={classes.details}>
                <Title title="Cập nhật thông tin" fontSize="3rem" margin="1.5rem 0 0 2.5rem"/>
                <form onSubmit={handleSubmit(onSubmit)}>
                    <Input
                        label="Họ và tên"
                        type="text"
                        {...register("name", {
                            required: "Họ và tên là bắt buộc",
                            minLength: {value: 3, message: "Họ và tên phải có ít nhất 3 ký tự"},
                            maxLength: {value: 50, message: "Họ và tên phải có nhiều nhất 50 ký tự"},
                        })}
                        placeholder="Họ và tên"
                        error={errors.name}
                    />
                    <Input
                        label="Địa chỉ"
                        type="text"
                        {...register("address", {
                            required: "Địa chỉ là bắt buộc",
                        })}
                        placeholder="Địa chỉ"
                        error={errors.address}
                    />
                    <Button
                        type="submit"
                        text="Cập nhật"
                        color="white"
                        backgroundColor="Green"
                        fontSize="1.5rem"
                        width="100%"
                        height="50px"
                        disabled={isSubmitting}
                    />
                </form>
            </div>
        </div>
    )
}