using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using api.Data;
using api.interfaces;
using api.Models;
using Microsoft.EntityFrameworkCore;

namespace api.Repository
{
    public class CommentRepository : ICommentRepository
    {
        private readonly ApplicationDBContext _Dbcontext;
        public CommentRepository(ApplicationDBContext dbcontext)
        {
            _Dbcontext = dbcontext;
        }

        public async Task<List<Comment>> GetAllAsync()
        {
            return await _Dbcontext.Comment.Include(a=>a.AppUser).ToListAsync();
        }

        public async Task<Comment?> GetByIdAsync(int id)
        {
            return await _Dbcontext.Comment.Include(a=>a.AppUser).FirstOrDefaultAsync(c=>c.Id==id);
        }
        
        public async Task<Comment> CreateAsync(Comment commentModel)
        {
            await _Dbcontext.Comment.AddAsync(commentModel);
            await _Dbcontext.SaveChangesAsync();
            return commentModel;
        }

        public async Task<Comment?> DeleteAsync(int id)
        {
            var commentModel = await _Dbcontext.Comment.FirstOrDefaultAsync(x => x.Id == id);

            if (commentModel == null)
                return null;

            _Dbcontext.Comment.Remove(commentModel);
            await _Dbcontext.SaveChangesAsync();
            return commentModel;
        }

         public async Task<Comment?> UpdateAsync(int id, Comment commentModel)
        {
            var existingComment = await _Dbcontext.Comment.FindAsync(id);

            if (existingComment == null)
            {
                return null;
            }

            existingComment.Title = commentModel.Title;
            existingComment.Content = commentModel.Content;

            await _Dbcontext.SaveChangesAsync();

            return existingComment;
        }
    }
}