import {useEffect} from 'react'
import classes from './registerPage.module.css'
import Title from '../../components/Title/Title'
import Input from '../../components/Input/Input'
import Button from '../../components/Button/Button'
import { useForm } from 'react-hook-form'
import { Link, useSearchParams, useNavigate} from 'react-router-dom'
import { useAuth } from '../../hooks/useAuth';
export default function RegisterPage() {
    const auth = useAuth();
    const { user } = auth;
    const navigate = useNavigate();
    const [params] = useSearchParams();
    const returnUrl = params.get('returnUrl') || '/';
    useEffect(() => {
        if(!user) return;
        returnUrl ? navigate(returnUrl) : navigate('/');
    }, [user]);
    const {
        register,
        handleSubmit,
        formState: { errors, isValid },
        getValues,
        watch
      } = useForm({ mode: "onChange" });
    const password = watch("password");
    const confirmPassword = watch("confirmPassword");
    const isMatch = password && confirmPassword && password === confirmPassword;
    
    const submit = async (data) => {
        await auth.register(data);
        
    }
    return (
        <div className={classes.container}>
            <div className={classes.details}>
                <Title title="Đăng ký" fontSize="3rem" margin="1.5rem 0 0 2.5rem"/>
                <form onSubmit={handleSubmit(submit)} noValidate>
                    <Input
                        label="Họ và tên"
                        type="text"
                        {...register("name", {
                            required: {value: true, message: "Họ và tên là bắt buộc"},
                            minLength: {value: 3, message: "Họ và tên phải có ít nhất 3 ký tự"},
                            maxLength: {value: 50, message: "Họ và tên phải có nhiều nhất 50 ký tự"},
                        })}
                        placeholder="Họ và tên"
                        error={errors.name}
                    />
                    <Input
                        label="Email"
                        type="email"
                        {...register("email", {
                            required: {value: true, message: "Email là bắt buộc"},
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
                    <Input
                        label="Xác nhận mật khẩu"
                        type="password"
                        {...register("confirmPassword", {
                            required: "Xác nhận mật khẩu là bắt buộc",
                            validate: (value) =>
                              value === getValues("password") || "Mật khẩu không khớp",
                        })}
                        placeholder="Xác nhận mật khẩu"
                        error={errors.confirmPassword}
                    />

                     {isMatch && !errors.confirmPassword && (
                    <p style={{ color: "green", marginLeft: "1rem" }}>✔ Mật khẩu khớp</p>
                    )}

                    <Input
                        label="Địa chỉ"
                        type="text"
                        {...register("address", {
                            required: "Địa chỉ là bắt buộc",
                        })}
                        placeholder="Địa chỉ"
                        error={errors.address}
                    />
                    <Button type="submit">Đăng ký</Button>
                    <div className={classes.register}>
                        Đã có tài khoản? &nbsp;
                        <Link style={{textDecoration: 'none', color: '#e7292e'}} to={`/login?returnUrl=${returnUrl}`}>Đăng nhập</Link>
                    </div>
                </form>
            </div>
        </div>
    )
}