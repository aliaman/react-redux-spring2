package com.repo.dao.data;

import com.repo.dao.pojo.User;
import org.hibernate.Session;
import org.hibernate.SessionFactory;

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

            for(User user : allusers){
                System.out.println(user.getEmail());
            }

        }catch (Exception e){
            e.printStackTrace();
        }finally {
            session.close();
            return allusers;
        }
    }
}