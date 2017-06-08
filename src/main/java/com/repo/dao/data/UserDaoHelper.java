package com.repo.dao.data;

import com.repo.dao.pojo.Comment;
import com.repo.dao.pojo.Role;
import com.repo.dao.pojo.User;
import org.hibernate.Session;
import org.hibernate.SessionFactory;
import org.hibernate.Transaction;

import javax.persistence.NoResultException;
import javax.persistence.Query;
import java.util.ArrayList;
import java.util.List;

/**
 * Created by ali_jalbani on 4/25/17.
 */
public class UserDaoHelper {
    public static List<User> getAllUsers(){
        List<User> allusers = new ArrayList<>();
        Session session = null;
        try{
            SessionFactory sessionFactory = HibernateUtil.getSessionFactory();
            session = sessionFactory.openSession();

            Query query = session.createQuery("from User");
            allusers = query.getResultList();

        }catch (Exception e){
            e.printStackTrace();
        }finally {
            session.close();
            return allusers;
        }
    }

    public static User findUserByEmail(String email) throws NoResultException{
        User user = null;
        try {
            SessionFactory sessionFactory = HibernateUtil.getSessionFactory();
            Session session = sessionFactory.openSession();
            Query query = session.
                    createQuery("from User where email=:email");
            query.setParameter("email", email);
            user = (User) query.getSingleResult();
            session.close();
        }catch(Exception e){
            System.out.println(e);
        }finally {
            return user;
        }
    }

    public static User updateUser(Integer id, String field, String value){
        User user = null;
        try {
            SessionFactory sessionFactory = HibernateUtil.getSessionFactory();
            Session session = sessionFactory.openSession();
            Transaction tx = session.beginTransaction();

            //first get the user you are trying to update
            user = session.get(User.class, id);
            switch (field){
                case "role":
                    user.setRole(session.get(Role.class, value));
                    break;
                case "email":
                    //TODO: Validate email;
                    user.setEmail(value);
                    break;
                case "name":
                    user.setName(value);
                    break;
                default:
                    //TODO: throw Unrecognized field updated Exception
            }
            session.update(user);
            tx.commit();
            session.close();
        }catch(Exception e){
            System.out.println(e);
        }finally {
            return user;
        }
    }
}
