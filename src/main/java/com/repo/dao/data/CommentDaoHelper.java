package com.repo.dao.data;

import com.repo.dao.pojo.Comment;
import org.hibernate.Session;
import org.hibernate.SessionFactory;

import javax.persistence.Query;
import java.util.ArrayList;
import java.util.List;

/**
 * Created by ali_jalbani on 5/19/17.
 */
public class CommentDaoHelper {

    public static List<Comment> getAllComments(){
        List<Comment> allComments = new ArrayList<>();
        Session session = null;
        try{
            SessionFactory sessionFactory = HibernateUtil.getSessionFactory();
            session = sessionFactory.openSession();

            Query query = session.createQuery("from Comment");
            allComments = query.getResultList();

        }catch (Exception e){
            e.printStackTrace();
        }finally {
            session.close();
            return allComments;
        }
    }
}

