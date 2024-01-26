import React from "react";
import { set, useForm } from "react-hook-form";

function componentName() {
  const {
    register,
    handleSubmit,
    formState: { errors },
    watch,
    setValue,
    reset
  } = useForm();
  const onSubmit = handleSubmit((data) => {
    reset(); //Limpia todo el formulario osea lo resetea
  });
  
  return (
    <div className="container mt-3 bg-dark   text-white p-3  w-50 rounded">
      <h2 className="text-center">Form</h2>
      <form onSubmit={onSubmit}>
        <div className="mb-3">
          <label htmlFor="nombre" className="form-label">
            Nombre :
          </label>
          <input
            type="input"
            {...register("nombre", {
              required: {
                value: true,
                message: "Name is required",
              },
              minLength: {
                value: 2,
                message: "Min length is 2 characters",
              },
              maxLength: {
                value: 15,
                message: "Max length is 15 characters",
              },
            })}
            className="form-control"
          />
          {errors.nombre && <span> {errors.nombre.message} </span>}
        </div>
        <div className="mb-3">
          <label htmlFor="correo" className="form-label">
            Correo :
          </label>
          <input
            type="email"
            className="form-control"
            {...register("correo", {
              required: {
                value: true,
                message: "Email is required",
              },
              pattern: {
                value: /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/,
                message: "Invalid email",
              },
            })}
          />
          {errors.correo && <span> {errors.correo.message} </span>}
        </div>
        <div className="mb-3">
          <label htmlFor="password" className="form-label">
            Password :
          </label>
          <input
            type="password"
            {...register("password", {
              required: {
                value: true,
                message: "Password is required",
              },
              minLength: {
                value: 5,
                message: "Password required 5 characteres",
              },
            })}
            className="form-control"
          />
          {errors.password && <span> {errors.password.message} </span>}
        </div>
        <div className="mb-3">
          <label htmlFor="confirmarPassword" className="form-label">
            Confirmar Password :
          </label>
          <input
            type="password"
            {...register("confirmarPassword", {
              required: {
                value: true,
                message: "Confirmar Password is required",
              },
              validate: (value) =>
                value === watch("password") || "El password no coinciden",
            })}
            className="form-control"
          />
          {errors.confirmarPassword && (
            <span>{errors.confirmarPassword.message} </span>
          )}
        </div>
        <div className="mb-3">
          <label htmlFor="fechaNacimiento" className="form-label">
            Fecha de Nacimiento :
          </label>
          <input
            type="date"
            {...register("fechaNacimiento", {
              required: {
                value: true,
                message: "Required Fecha de Nacimiento",
              },
              validate: (value) => {
                const fechaNacimiento = new Date(value);
                const fechaActual = new Date();
                const edad =
                  fechaActual.getFullYear() - fechaNacimiento.getFullYear();

                return edad > 18 || "Debe ser mayor de edad";
              },
            })}
            className="form-control"
          />
          {errors.fechaNacimiento && (
            <span>{errors.fechaNacimiento.message}</span>
          )}
        </div>
        <div className="mb-3">
          <label htmlFor="pais" className="form-label">
            Pais :
          </label>
          <select className="form-control" {...register("pais")}>
            <option value="mx">Mexico</option>
            <option value="co">Colombia</option>
            <option value="ar">Argentina</option>
          </select>
          {watch("pais") === "ar" && (
            <>
              <input
                type="input"
                className="form-control"
                {...register("cuidad", {
                  required: {
                    value: true,
                    message: "Required in cuidad",
                  },
                })}
              />
              {errors.cuidad && <span>{errors.cuidad.message}</span>}
            </>
          )}
        </div>
        <div className="mb-3">
          <label htmlFor="foto" className="form-label">
            Foto de Perfil :
          </label>
          <input type="file" onChange={ 
            (e) => {
              console.log(e.target.files[0]);   
              setValue("fotoUsuario",e.target.files[0].name)
            }
          } className="form-control" />
        </div>
        <div>
            <input type="checkbox"  {...register("terminos",{
                required : {
                    value : true,
                    message : "Please accept terms and conditions"
                }
            })} />
            {
                errors.terminos && <span>{errors.terminos.message}</span>
            }
            <label htmlFor="termino" className="ms-2">Aceptar Terminos y Condiciones</label>
        </div>

        <div className="mb-3">
          <button className="btn btn-primary" type="submit">
            Enviar
          </button>
          <pre>{JSON.stringify(watch(), null, 2)}</pre>
        </div>
      </form>
    </div>
  );
}

export default componentName;
