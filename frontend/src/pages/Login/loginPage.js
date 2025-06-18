import React from 'react';
import { useForm } from 'react-hook-form';
import { useNavigate, useSearchParams, Link } from 'react-router-dom';
import { useAuth } from '../../hooks/useAuth';
import classes from './loginPage.module.css';
import Title from '../../components/Title/Title';
import Input from '../../components/Input/Input';
import Button from '../../components/Button/Button';

export default function LoginPage() {
    const { register, handleSubmit, formState: { errors } } = useForm();
    const navigate = useNavigate();
    const { user, login } = useAuth();
    const [params] = useSearchParams();
    const returnUrl = params.get('returnUrl') || '/';

    const onSubmit = async (data) => {
        try {
            await login(data.email, data.password);
            navigate(returnUrl);
        } catch (error) {
            console.error("Lỗi đăng nhập:", error);
        }
    };

    return (
        <div className={classes.container}>
            <div className={classes.details}>
                <Title title="Đăng nhập" fontSize="3rem" margin="1.5rem 0 0 2.5rem" />
                <form onSubmit={handleSubmit(onSubmit)} noValidate>
                    <Input
                        label="Email"
                        type="email"
                        {...register("email", {
                            required: "Email là bắt buộc",
                            pattern: {
                                value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
                                message: "Email không hợp lệ",
                            },
                        })}
                        placeholder="Email"
                        error={errors.email}
                    />
                    <Input
                        label="Mật khẩu"
                        type="password"
                        {...register("password", {
                            required: "Mật khẩu là bắt buộc",
                        })}
                        placeholder="Mật khẩu"
                        error={errors.password}
                    />
                    <Button type="submit">Đăng nhập</Button>
                    <div className={classes.register}>
                        Chưa có tài khoản? &nbsp;
                        <Link style={{textDecoration: 'none', color: '#e7292e'}} to={`/register?returnUrl=${returnUrl}`}>Đăng ký</Link>
                    </div>
                </form>
            </div>
        </div>
    );
}