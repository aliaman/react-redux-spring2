package com.repo.dao.data;

import com.repo.dao.pojo.Comment;
import org.hibernate.Session;
import org.hibernate.SessionFactory;
import org.hibernate.Transaction;

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

    public static void saveComments(String id, String comment, String reason, String mitigation){
        Session session = null;
        try{
            SessionFactory sessionFactory = HibernateUtil.getSessionFactory();
            session = sessionFactory.openSession();
            Transaction tx = session.beginTransaction();

            Comment comment1 = new Comment();
            comment1.setId(id);
            comment1.setComment(comment);
            comment1.setReason(reason);
            comment1.setMitigation(mitigation);
            session.saveOrUpdate(comment1);
            tx.commit();

        }catch(Exception e){

        }finally{
            session.close();
        }
    }
}

