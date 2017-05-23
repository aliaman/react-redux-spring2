package com.repo.dao.data;

import com.repo.dao.pojo.Comment;
import org.hibernate.Criteria;
import org.hibernate.Session;
import org.hibernate.SessionFactory;
import org.hibernate.Transaction;
import org.hibernate.criterion.Projection;
import org.hibernate.criterion.Projections;

import javax.persistence.Query;
import javax.persistence.criteria.CriteriaBuilder;
import java.util.ArrayList;
import java.util.Iterator;
import java.util.List;
import java.util.Vector;

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

    public static List<Object> getDistinctColumn(String column){
        Session session = null;
        List<Object> uniqueComments = new ArrayList<>();
        try{
            SessionFactory sessionFactory = HibernateUtil.getSessionFactory();
            session = sessionFactory.openSession();

            uniqueComments = session.createQuery(
                    "SELECT DISTINCT c." + column + " " +
                            "FROM Comment c " + " " +
                    "WHERE c." + column + " !=''" , Object.class )
                    .getResultList();

            System.out.println(uniqueComments);

        }catch(Exception e){

        }finally{
            session.close();
            return uniqueComments;
        }
    }
}

